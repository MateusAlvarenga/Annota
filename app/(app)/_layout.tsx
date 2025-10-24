import { Stack } from 'expo-router';
import React from 'react';

export default function AppLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="notes" 
        options={{ 
          title: 'My Notes',
          headerShown: true 
        }} 
      />
      <Stack.Screen 
        name="note-editor" 
        options={{ 
          title: 'Edit Note',
          headerShown: true,
          presentation: 'modal'
        }} 
      />
    </Stack>
  );
}
