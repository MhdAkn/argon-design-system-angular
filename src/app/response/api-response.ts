import { HttpCode } from "../enums/EN_SHARED/EN_HttpCode.enum";

export class ApiResponse {
    message?: string;
    status?: HttpCode;
    data?: any;

    constructor(message: string, status: HttpCode, data: any) {
        this.message = message;
        this.status = status;
        this.data = data;
    }
}


