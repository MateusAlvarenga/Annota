// src/hooks/useNotes.ts
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, updateDoc, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { auth, db } from '../services/firebase';
import { Note } from '../types/note';

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const q = query(
      collection(db, 'notes'),
      where('userId', '==', auth.currentUser?.uid),
      orderBy('updatedAt', 'desc')
    );
    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Note));
      setNotes(data);
    });
    return unsub;
  }, []);

  const addNote = async (title: string, content: string) =>
    addDoc(collection(db, 'notes'), {
      title,
      content,
      userId: auth.currentUser?.uid,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

  const updateNote = async (id: string, content: string) =>
    updateDoc(doc(db, 'notes', id), { content, updatedAt: Date.now() });

  const deleteNote = async (id: string) => deleteDoc(doc(db, 'notes', id));

  return { notes, addNote, updateNote, deleteNote };
}
