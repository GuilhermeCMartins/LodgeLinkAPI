import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/domain/entities/user/user.entity';
import { UnauthorizedException } from 'src/domain/exceptions/UnauthorizedException';

@Injectable()
export class JwtAuthService {
    constructor(private readonly jwtService: JwtService) { }

    generateToken(user: Partial<User>): string {
        const payload = { email: user.email, id: user.id };
        const expiresIn = 3600;
        return this.jwtService.sign(payload, { expiresIn });
    }

    verifyToken(token: string): any {
        try {
            return this.jwtService.verify(token);
        } catch (error) {
            throw new UnauthorizedException('Invalid or expired token.');
        }
    }
}
