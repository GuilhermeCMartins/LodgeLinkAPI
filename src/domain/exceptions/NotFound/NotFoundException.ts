import { CustomHttpException } from "../Base/CustomHttpException";
import { HttpStatus } from '@nestjs/common';

export class NotFoundException extends CustomHttpException {
    constructor(message: string) {
        super(message, 'not_found', HttpStatus.NOT_FOUND);
    }
}