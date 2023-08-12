import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/domain/entities/user/user.entity';
import { AuthRepository } from './Auth.repository';


describe('AuthRepository', () => {
    let authRepository: AuthRepository;
    let mockAuthRepository: Repository<User>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthRepository,
                {
                    provide: getRepositoryToken(User),
                    useClass: Repository,
                },
            ],
        }).compile();

        authRepository = module.get<AuthRepository>(AuthRepository);
        mockAuthRepository = module.get<Repository<User>>(getRepositoryToken(User));
    });

    it('should be defined', () => {
        expect(authRepository).toBeDefined();
    });
});
