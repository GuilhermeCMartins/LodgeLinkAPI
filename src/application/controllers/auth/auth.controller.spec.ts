import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from 'src/domain/services/auth/auth.service';
import { NotFoundException } from '../../../domain/exceptions/NotFound/NotFoundException';
import { BadRequestException } from '../../../domain/exceptions/BadRequest/BadRequestException';
import { User } from 'src/domain/entities/user/user.entity';

describe('AuthController', () => {
    let authController: AuthController;
    let authService: AuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                {
                    provide: AuthService,
                    useValue: {
                        validateUser: jest.fn(),
                        login: jest.fn(),
                    },
                },
            ],
        }).compile();

        authController = module.get<AuthController>(AuthController);
        authService = module.get<AuthService>(AuthService);
    });

    describe('login', () => {
        it('should return access token on successful login', async () => {
            const loginData = {
                email: 'user@example.com',
                password: 'password123',
            };
            const user: User = {
                id: 1,
                firstName: "teste",
                lastName: "teste",
                email: loginData.email,
                password: loginData.password,
                cpf: "123.456.780-20",
                reservations: [],
                role: 2
            };
            const accessToken = 'fakeAccessToken';


            jest.spyOn(authService, 'validateUser').mockResolvedValue(user);
            jest.spyOn(authService, 'login').mockReturnValue(Promise.resolve({ accessToken }));

            const result = await authController.login(loginData);

            expect(result).toEqual({ accessToken });
        });

        it('should throw NotFoundException for invalid credentials', async () => {
            const loginData = {
                email: 'invalid@example.com',
                password: 'invalidPassword',
            };

            jest.spyOn(authService, 'validateUser').mockResolvedValue(null);

            await expect(authController.login(loginData)).rejects.toThrowError(
                NotFoundException,
            );
        });

        it('should throw BadRequestException for invalid login data', async () => {
            const loginData = {
                email: 'user@example.com',
                password: '',
            };

            await expect(authController.login(loginData)).rejects.toThrowError(
                BadRequestException,
            );
        });
    });
});
