import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { NotFoundException } from 'src/domain/exceptions/NotFoundException';
import { AuthService } from 'src/domain/services/auth/auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() loginData: { email: string; password: string }): Promise<{ accessToken: string }> {
        const user = await this.authService.validateUser(loginData.email, loginData.password);
        if (!user) {
            throw new NotFoundException('Invalid credentials');
        }
        return this.authService.login(user);
    }
}
