// auth/jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../../domain/services/auth/auth.service';
import { User } from '../../domain/entities/user/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: '!dapjdaod@dsoaidjiasd$$##$',
        });
    }

    async validate(payload: any): Promise<User> {
        const user = await this.authService.validateUserById(payload.sub);

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
