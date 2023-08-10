import { HttpStatus } from '@nestjs/common';

export default interface CustomError {
    statusCode: HttpStatus;
    message: string;
    code: string;
}