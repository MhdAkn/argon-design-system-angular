import { Note } from "./Note";
import { BaseEntity } from "./bases_entites/BE_shared/base-entity";
import { User } from "./user";

export class Like extends BaseEntity {
    id: string
    user: User
    note: Note;
}