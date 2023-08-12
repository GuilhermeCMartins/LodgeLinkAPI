import { HttpException, HttpStatus } from '@nestjs/common';
import { BadRequestException } from './BadRequestException';



describe('BadRequestException', () => {
    it('should create a CustomHttpException instance', () => {
        const message = 'Custom error message';
        const code = 'bad_request';
        const statusCode = HttpStatus.BAD_REQUEST;

        const customHttpException = new BadRequestException(message);

        expect(customHttpException).toBeDefined();
        expect(customHttpException instanceof HttpException).toBe(true);
        expect(customHttpException.message).toEqual(message);
        expect(customHttpException.getResponse()).toEqual({
            statusCode,
            message,
            code,
        });
    });
});
