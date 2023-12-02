import { BaseEntity } from './bases_entites/BE_shared/base-entity';

export class Message extends BaseEntity {
    id: string
    pseudo: string
    content: string
    email: string;
}

