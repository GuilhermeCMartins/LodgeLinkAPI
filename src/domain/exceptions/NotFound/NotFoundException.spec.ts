import { HttpException, HttpStatus } from '@nestjs/common';
import { NotFoundException } from './NotFoundException';


describe('NotFoundException', () => {
    it('should create a CustomHttpException instance', () => {
        const message = 'Custom error message';
        const code = 'not_found';
        const statusCode = HttpStatus.NOT_FOUND;

        const customHttpException = new NotFoundException(message);

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
