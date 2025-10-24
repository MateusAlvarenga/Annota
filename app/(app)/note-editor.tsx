import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Appbar, TextInput } from 'react-native-paper';
import { useNotes } from '../../src/hooks/useNotes';

export default function NoteEditor() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const router = useRouter();
  const { notes, addNote, updateNote } = useNotes();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const note = notes.find(n => n.id === id);

  useEffect(() => {
    if (note) {
      setTitle(note.title || '');
      setContent(note.content || '');
    }
  }, [note]);

  const handleSave = async () => {
    if (!title.trim() && !content.trim()) return;
    
    setIsLoading(true);
    try {
      if (id && note) {
        // Update existing note
        await updateNote(id, content);
      } else {
        // Create new note
        await addNote(title.trim() || 'Untitled', content);
      }
      router.back();
    } catch (error) {
      console.error('Error saving note:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title={id ? 'Edit Note' : 'New Note'} />
        <Appbar.Action 
          icon="content-save" 
          onPress={handleSave}
          disabled={isLoading}
        />
      </Appbar.Header>
      
      <View style={{ flex: 1, padding: 16 }}>
        <TextInput
          label="Title"
          value={title}
          onChangeText={setTitle}
          style={{ marginBottom: 16 }}
          placeholder="Enter note title..."
        />
        <TextInput
          label="Content"
          value={content}
          onChangeText={setContent}
          multiline
          style={{ flex: 1, textAlignVertical: 'top' }}
          placeholder="Write your note here..."
        />
      </View>
    </View>
  );
}
