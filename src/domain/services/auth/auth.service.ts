import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from 'src/domain/entities/user/user.entity';
import { JwtAuthService } from '../jwt/jwt.service';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private readonly jwtService: JwtAuthService) { }

    async validateUser(email: string, password: string): Promise<User | null> {
        const user = await this.userService.findUserByEmail(email);

        if (user && user.password === password) {
            return user;
        }
        
        return null;
    }

    async validateUserById(userId: number): Promise<User | null> {
        const user = await this.userService.findUserById(userId);
        return user || null;
    }

    async login(user: User): Promise<{ accessToken: string }> {
        const payload = { id: user.id, email: user.email };
        return {
            accessToken: this.jwtService.generateToken(payload),
        };
    }
}
