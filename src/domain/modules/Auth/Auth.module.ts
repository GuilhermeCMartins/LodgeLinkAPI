import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from 'src/application/controllers/auth/auth.controller';
import { UserController } from 'src/application/controllers/users/user.controller';
import { User } from 'src/domain/entities/user/user.entity';
import { AuthRepository } from 'src/domain/repositories/Auth/auth.repository';
import { UserRepository } from 'src/domain/repositories/user/user.repository';
import { AuthService } from 'src/domain/services/auth/auth.service';
import { UserService } from 'src/domain/services/user/user.service';
import { JwtAuthModule } from '../Jwt/Jwt.module';




@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtAuthModule,
    ],
    providers: [AuthService, AuthRepository, UserService, UserRepository],
    controllers: [AuthController, UserController],
    exports: [AuthService],
})
export class AuthModule { }
