import { Module } from '@nestjs/common';
import { JwtAuthService } from 'src/domain/services/jwt/jwt.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        JwtModule.register({
            secret: 'your_secret_key_here',
            signOptions: { expiresIn: '1h' },
        }),
    ],
    providers: [JwtAuthService], 
    exports: [JwtAuthService],
})
export class JwtAuthModule { }
