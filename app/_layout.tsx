import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Redirect, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Provider as PaperProvider } from 'react-native-paper';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { auth } from '@/src/services/firebase';

export const unstable_settings = {
  anchor: '(app)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return null; // or splash screen
  }

  return (
    <PaperProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="(app)" options={{ headerShown: false }} />
        </Stack>
        {!user && <Redirect href="/login" />}
        {user && <Redirect href="/(app)/notes" />}
        <StatusBar style="auto" />
      </ThemeProvider>
    </PaperProvider>
  );
}
