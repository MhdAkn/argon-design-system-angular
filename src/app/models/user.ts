import { Like } from "./Like";
import { Note } from "./Note";
import { UserProfileMedia } from "./User_media.model";
import { BaseEntity } from "./bases_entites/BE_shared/base-entity";
export class User extends BaseEntity {
    id: string
    firstName: string
    lastName: string
    email: string
    pseudo: string
    password: string
    telephone: string
    is_active: boolean
    note: Note[]
    profile: UserProfileMedia
    like: Like[]
    acceptTerm: boolean
    biographie: string
    rememberMe: boolean
}