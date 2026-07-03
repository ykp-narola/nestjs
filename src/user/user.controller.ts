import { Controller, Get } from '@nestjs/common';

@Controller('user')  //Decorator
export class UserController {

    @Get('')
    getAllUsers() {
        return 'All users !!';
    }

    @Get('sachin')
    test() {
        return 'test';
    }
}
