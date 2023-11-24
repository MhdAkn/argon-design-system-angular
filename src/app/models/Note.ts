import { Media } from "./Media";
import { BaseEntity } from "./bases_entites/BE_shared/base-entity";
import { User } from "./user";

export class Note extends BaseEntity {
    id: string
    title: string;
    content: string;
    image?: Media
    typeNotes: string
    user: User
    isLiked:boolean
    isDelete:boolean

}

