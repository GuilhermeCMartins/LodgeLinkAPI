import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'src/application/controllers/users/user.controller';
import { UserRepository } from 'src/domain/repositories/user/user.repository';
import { UserService } from 'src/domain/services/user/user.service';
import { JwtAuthModule } from '../Jwt/Jwt.module';
import { User } from 'src/domain/entities/user/user.entity';



@Module({
    imports: [TypeOrmModule.forFeature([User, JwtAuthModule])],
    providers: [UserService, UserRepository],
    controllers: [UserController],
    exports: [UserService, UserRepository],
})
export class UserModule { }
