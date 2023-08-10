import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomHttpException extends HttpException {
    constructor(message: string, code: string, statusCode: HttpStatus) {
        super({ statusCode, message, code }, statusCode);
    }
}
