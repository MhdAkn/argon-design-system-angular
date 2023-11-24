export abstract class BaseEntity {
    createdAt: Date
    updatedAt: Date
    deleteAt: Date
    updatedBy: string;
    deleted: boolean;
    customCreateDate: Date;
    //UTILS
    clientEndUtils: any;

}

