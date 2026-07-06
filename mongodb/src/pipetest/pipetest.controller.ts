import { Body, Controller, ParseIntPipe, Post } from '@nestjs/common';
import { UppercasePipe } from 'src/common/pipes/uppercase/uppercase.pipe';

@Controller('pipetest')
export class PipetestController {
    // Custom pipe
    // nest g pipe common/pipes/uppercase      // for creating custom pipe
    @Post('custom')
    tranformName(@Body('name', new UppercasePipe) name: string) {
        console.log(name);
        return `your name is ${name}`;
    }

    //built-in pipe
    @Post('builtin')
    builtinPipe(@Body('age', ParseIntPipe) age: number) {
        console.log(age);
        return `your age is ${age}`;
    }
}
