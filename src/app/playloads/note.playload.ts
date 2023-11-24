import { Media } from "../models/Media";
import { Note } from "../models/Note";

export class NewNotePlayload {
    title: string;
    content: string;
    image?: Media
    typeNotes: string
}

export type NoteWithLikeInfo = {
    note: Note,
    isLiked: boolean,
}