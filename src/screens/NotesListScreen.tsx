// src/screens/NotesListScreen.tsx
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList } from 'react-native';
import { FAB, List } from 'react-native-paper';
import { useNotes } from '../hooks/useNotes';

export default function NotesListScreen() {
  const { notes } = useNotes();
  const nav = useNavigation();

  return (
    <>
      <FlatList
        data={notes}
        keyExtractor={(n) => n.id}
        renderItem={({ item }) => (
          <List.Item
            title={item.title || 'Untitled'}
            description={item.content.slice(0, 100)}
            onPress={() => nav.navigate('NoteEditor', { id: item.id })}
          />
        )}
      />
      <FAB icon="plus" style={{ position: 'absolute', right: 16, bottom: 16 }} onPress={() => nav.navigate('NoteEditor')} />
    </>
  );
}
