import { create } from "zustand";
import type { NoteResponse } from "../api/types";

interface NotesState {
    notes: NoteResponse[];
    setNotes: (notes: NoteResponse[]) => void;
    addNote: (note: NoteResponse) => void;
    removeNote: (id: number) => void;
}

export const useNoteStore = create<NotesState>(set => ({
  notes: [],

  setNotes: (notes) => set({ notes }),

  addNote: (note) =>
    set((state) => ({
      notes: [...state.notes, note],
    })),

  removeNote: (id) =>
    set((state) => ({
      notes: state.notes.filter((note) => note.id !== id),
    })),
}));