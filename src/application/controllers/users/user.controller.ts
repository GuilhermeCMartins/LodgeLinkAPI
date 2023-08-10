import { Body, Controller, Post } from '@nestjs/common';
import { User } from 'src/domain/entities/user/user.entity';
import { UserService } from 'src/domain/services/user/user.service';


@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    async createUser(@Body() userData: Partial<User>): Promise<User> {
        return await this.userService.createUser(userData);
    }


}
