import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/entities/user/user.entity';


export class AuthRepository extends Repository<User> {
    constructor(
        @InjectRepository(User)
        private authRepository: Repository<User>
    ) {
        super(authRepository.target, authRepository.manager, authRepository.queryRunner)
    }

}
