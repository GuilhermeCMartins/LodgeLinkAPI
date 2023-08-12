import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { BadRequestException } from 'src/domain/exceptions/BadRequest/BadRequestException';
import { NotFoundException } from 'src/domain/exceptions/NotFound/NotFoundException';
import { AuthService } from 'src/domain/services/auth/auth.service';
import { loginUserSchema } from 'src/utils/validations/user.validation';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() loginData: { email: string; password: string }): Promise<{ accessToken: string }> {
        try {
            const { error } = loginUserSchema.validate(loginData);

            if (error) {
                throw new BadRequestException(error.message)
            }

            const user = await this.authService.validateUser(loginData.email, loginData.password);

            if (!user) {
                throw new NotFoundException('Invalid credentials');
            }

            return this.authService.login(user);

        } catch (error) {
            throw error
        }
    }
}
