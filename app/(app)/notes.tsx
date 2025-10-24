import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList } from 'react-native';
import { FAB, List } from 'react-native-paper';
import { useNotes } from '../../src/hooks/useNotes';

export default function NotesListScreen() {
  const { notes } = useNotes();
  const router = useRouter();

  return (
    <>
      <FlatList
        data={notes}
        keyExtractor={(n) => n.id}
        renderItem={({ item }) => (
          <List.Item
            title={item.title || 'Untitled'}
            description={item.content.slice(0, 100)}
            onPress={() => router.push(`/(app)/note-editor?id=${item.id}`)}
          />
        )}
      />
      <FAB 
        icon="plus" 
        style={{ position: 'absolute', right: 16, bottom: 16 }} 
        onPress={() => router.push('/(app)/note-editor')} 
      />
    </>
  );
}
