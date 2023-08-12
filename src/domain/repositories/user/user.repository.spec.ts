import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from './user.repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/domain/entities/user/user.entity';
import { createMockUser } from 'src/utils/test/mockData';

describe('UserRepository', () => {
    let userRepository: UserRepository;
    let userRepositoryToken: string | Function;
    let mockUserRepository: Partial<Record<keyof Repository<User>, jest.Mock>>;

    beforeAll(async () => {
        userRepositoryToken = getRepositoryToken(User);

        mockUserRepository = {
            create: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserRepository,
                {
                    provide: userRepositoryToken,
                    useValue: mockUserRepository,
                },
            ],
        }).compile();

        userRepository = module.get<UserRepository>(UserRepository);
    });

    it('should be defined', () => {
        expect(userRepository).toBeDefined();
    });

    describe('create', () => {
        it('should call create method', () => {

            jest.spyOn(userRepository, 'create').mockReturnValue(createMockUser);

            const result = userRepository.create(createMockUser);

            expect(result).toEqual(createMockUser);
        });
    });
});
