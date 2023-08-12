import { HttpException, HttpStatus } from '@nestjs/common';
import { CustomHttpException } from './CustomHttpException';


describe('CustomHttpException', () => {
    it('should create a CustomHttpException instance', () => {
        const message = 'Custom error message';
        const code = 'CUSTOM_ERROR';
        const statusCode = HttpStatus.BAD_REQUEST;

        const customHttpException = new CustomHttpException(message, code, statusCode);

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
