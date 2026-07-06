import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    async createUser(@Body() user: User): Promise<User> {
        return this.userService.createUser(user);
    }

    @Get()
    async getAllUsers(): Promise<User[]> {
        return this.userService.getAllUsers();
    }

    @Get('search')
    async searchUsers(@Query() filter: { name?: string; email?: string; age?: number }): Promise<User[]> {
        return this.userService.searchUsers(filter);
    }

    @Get(':id')
    async getUser(@Param('id', ParseIntPipe) id: number): Promise<User | null> {
        return this.userService.getUser(id);
    }

    @Put(':id')
    async updateUser(@Param('id', ParseIntPipe) id: number, @Body() user: User): Promise<User | null> {
        return this.userService.updateUser(id, user);
    }

    @Delete(':id')
    async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<User | null> {
        return this.userService.deleteUser(id);
    }
}
