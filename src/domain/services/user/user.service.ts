import { Injectable } from '@nestjs/common';
import { User } from 'src/domain/entities/user/user.entity';
import { UserRepository } from 'src/domain/repositories/user/user.repository';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
    constructor(
        private userRepository: UserRepository,
    ) { }

    async findUserByEmail(email: string): Promise<User | undefined> {
        return await this.userRepository.findOne({ where: { email: email } });
    }

    async findUserById(userId: number): Promise<User | undefined> {
        return await this.userRepository.findOne({ where: { id: userId } });
    }

    async createUser(userData: Partial<User>): Promise<User | null> {
        const existingUserEmail = await this.userRepository.findOne({ where: { email: userData.email } });
        const existingUserCpf = await this.userRepository.findOne({ where: { cpf: userData.cpf } });

        if (existingUserEmail) {
            return null;
        }

        if (existingUserCpf) {
            return null;
        }

        const hashedPassword = await bcrypt.hash(userData.password, 10);

        const newUser = this.userRepository.create({
            ...userData,
            password: hashedPassword,
        });

        return await this.userRepository.save(newUser);
    }

}


