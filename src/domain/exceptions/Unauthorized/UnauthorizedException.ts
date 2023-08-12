import { CustomHttpException } from "../Base/CustomHttpException";
import { HttpStatus } from '@nestjs/common';

export class UnauthorizedException extends CustomHttpException {
    constructor(message: string) {
        super(message, 'unauthorized', HttpStatus.UNAUTHORIZED);
    }
}
