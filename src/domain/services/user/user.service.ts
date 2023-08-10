import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/entities/user/user.entity';
import { UserRepository } from 'src/domain/repositories/user/user.repository';
import { Repository } from 'typeorm';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: Repository<User>,
    ) { }

    async findUserByEmail(email: string): Promise<User | undefined> {
        return await this.userRepository.findOne({ where: { email: email } });
    }

    async findUserById(userId: number): Promise<User | undefined> {
        return await this.userRepository.findOne({ where: { id: userId } });
    }

    async createUser(userData: Partial<User>): Promise<User> {
        const newUser = this.userRepository.create(userData);
        return await this.userRepository.save(newUser);
    }

}
