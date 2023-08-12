import { HttpException, HttpStatus } from '@nestjs/common';
import { UnauthorizedException } from './UnauthorizedException';



describe('UnauthorizedException', () => {
    it('should create a CustomHttpException instance', () => {
        const message = 'Custom error message';
        const code = 'unauthorized';
        const statusCode = HttpStatus.UNAUTHORIZED;

        const customHttpException = new UnauthorizedException(message);

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
