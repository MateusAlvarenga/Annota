import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { auth } from '../src/services/firebase';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text variant="headlineSmall">Welcome to Annota</Text>
      <Button mode="contained" onPress={() => promptAsync()} disabled={!request}>
        Sign in with Google
      </Button>
    </View>
  );
}
