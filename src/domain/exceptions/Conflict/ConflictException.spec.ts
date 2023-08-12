import { HttpException, HttpStatus } from '@nestjs/common';
import { ConflictException } from './ConflictException';



describe('ConflictException', () => {
    it('should create a CustomHttpException instance', () => {
        const message = 'Custom error message';
        const code = 'conflict';
        const statusCode = HttpStatus.CONFLICT;

        const customHttpException = new ConflictException(message);

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
