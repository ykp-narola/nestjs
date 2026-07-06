import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';

@Controller('user')  //Decorator
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    createUser(@Body() user: Partial<User>): Promise<User> {
        return this.userService.createUser(user);
    }

    @Get()
    getAllUsers(): Promise<User[]> {
        return this.userService.getAllUsers();
    }

    @Put(":id")
    updateUser(@Param("id") id: string, @Body() user: User): Promise<User> {
        return this.userService.updateUser(id, user);
    }
}
