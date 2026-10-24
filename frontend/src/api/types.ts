export interface NoteResponse {
    id: number;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
};

export interface CreateNoteRequest {
    title: string;
    content: string;
};