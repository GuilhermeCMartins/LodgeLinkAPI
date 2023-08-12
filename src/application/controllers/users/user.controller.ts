import { Body, Controller, Post } from '@nestjs/common';
import { User } from 'src/domain/entities/user/user.entity';
import { BadRequestException } from 'src/domain/exceptions/BadRequest/BadRequestException';
import { UserService } from 'src/domain/services/user/user.service';
import { createUserSchema } from 'src/utils/validations/user.validation';


@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    async createUser(@Body() userData: Partial<User>): Promise<User> {

        try {
            const { error, value } = createUserSchema.validate(userData);

            if (error) {
                throw new BadRequestException(error.message)
            }

            const createdUser = await this.userService.createUser(value);

            if (!createdUser) {
                throw new BadRequestException('Email or CPF already exists.')
            }

            return createdUser
        } catch (error) {
            throw error
        }
    }


}
