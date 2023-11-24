import { DestinationType } from "../enums/EN_files/EN_DestinationType.enum";
import { MediaType } from "../enums/EN_files/EN_MediaType.enum";
import { BaseEntity } from "./bases_entites/BE_shared/base-entity";

export abstract class Media extends BaseEntity {
    id: string;
    link: string;
    originalName: string;
    type: string;
    postedTypeId: number;
    description?: string;
    mediaType: MediaType;
    destination: DestinationType
    previousLink: string
    previousId: number
    thumbnailUrl: string
  }