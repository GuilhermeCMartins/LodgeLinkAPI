import { CustomHttpException } from "../Base/CustomHttpException";
import { HttpStatus } from '@nestjs/common';

export class BadRequestException extends CustomHttpException {
    constructor(message: string) {
        super(message, 'bad_request', HttpStatus.BAD_REQUEST);
    }
}
