import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import LoginScreen from '../screens/LoginScreen';
import NoteEditor from '../screens/NoteEditor';
import NotesListScreen from '../screens/NotesListScreen';
import { auth } from '../services/firebase';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const [user, loading] = useAuthState(auth);

  if (loading) return null; // or splash screen

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen name="NotesList" component={NotesListScreen} options={{ title: 'My Notes' }} />
            <Stack.Screen name="NoteEditor" component={NoteEditor} options={{ title: 'Edit Note' }} />
          </>
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
