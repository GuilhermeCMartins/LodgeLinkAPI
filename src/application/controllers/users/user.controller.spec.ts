import { UserService } from "src/domain/services/user/user.service";
import { UserController } from "./user.controller";
import { User } from "src/domain/entities/user/user.entity";
import { BadRequestException } from "src/domain/exceptions/BadRequest/BadRequestException";

describe('UserController', () => {
    let userController: UserController;
    let userService: Partial<UserService>;

    beforeEach(() => {
        userService = {
            createUser: jest.fn()
        }
        userController = new UserController(userService as UserService);
    })

    it('should create a user successfully with valid data', async () => {
        const userData = {
            role: 1,
            firstName: 'John',
            lastName: 'Doe',
            email: 'johndoe@example.com',
            password: 'Abc123$*',
            cpf: '123.456.789-00',
        }

        const createdUser = {
            id: 1,
            ...userData,
        }

        jest.spyOn(userService, 'createUser').mockResolvedValueOnce(createdUser as User)

        const result = await userController.createUser(userData)

        expect(result).toEqual(createdUser)
    });

    it('should throw a BadRequestException if the user email already exists', async () => {
        const userData = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'johndoe@example.com',
            password: 'Abc123$*',
            role: 1,
            cpf: '123.456.789-00',
        }

        jest.spyOn(userService, 'createUser').mockResolvedValueOnce(null)

        try {
            await userController.createUser(userData)
        } catch (error) {
            expect(error).toBeInstanceOf(BadRequestException)
            expect(error.message).toBe('Email or CPF already exists.')
        }
    });

    it('should throw a BadRequestException if the user cpf already exists', async () => {
        const userData = {
            firstName: 'John',
            lastName: 'Doe',
            email: 'johndoe@example.com',
            password: 'Abc123$*',
            role: 1,
            cpf: '123.456.789-00',
        }

        jest.spyOn(userService, 'createUser').mockResolvedValueOnce(null)

        try {
            await userController.createUser(userData)
        } catch (error) {
            expect(error).toBeInstanceOf(BadRequestException)
            expect(error.message).toBe('Email or CPF already exists.')
        }
    });

    it('should throw a BadRequestException if the user data is invalid', async () => {
        const userData = {
            firstName: '',
            lastName: '',
            email: 'johndoe@example.com',
            password: 'Abc123$*',
            role: 1,
            cpf: '123.456.789-00',
        }

        try {
            await userController.createUser(userData)
        } catch (error) {
            expect(error).toBeInstanceOf(BadRequestException)
            expect(error.message).toBe('First name cannot be empty')
        }
    });

});
