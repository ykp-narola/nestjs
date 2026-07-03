import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Put, UseFilters, UseGuards } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import type { Employee } from './interfaces/employee.interface';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { RolesGuard } from 'src/guards/roles/roles.guard';
import { Roles } from 'src/guards/roles/roles.decorator';
import { Role } from 'src/guards/roles/roles.enum';
import { HttpExceptionFilter } from 'src/filters/http-exception/http-exception.filter';

@Controller('employee')
@UseFilters(HttpExceptionFilter)
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService) { }


    @Get()
    // @UseGuards(AuthGuard)
    @UseGuards(RolesGuard)
    @Roles(Role.Admin)
    getAllEmployees() {
        console.log("Only admin can login");
        // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        throw new Error('Hello');
        return this.employeeService.getAllEmployees();
    }

    @Get(':id')
    getEmployeeById(@Param('id') id: string) {
        // console.log(typeof id); //string
        // console.log(id); //string

        // console.log(typeof +id); // number
        // console.log(+id); //number
        return this.employeeService.getEmployeeById(+id);
    }

    @Post()
    createEmployee(@Body() body: CreateEmployeeDto) {
        return this.employeeService.createEmployee(body);
    }

    @Put(':id')
    updateEmployee(@Param('id') id: string, @Body() body: Employee) {
        return this.employeeService.updateEmployee(+id, body);
    }

    @Patch(':id')
    updateEmployeePatch(@Param('id') id: string, @Body() body: Partial<Employee>) {
        return this.employeeService.updateEmployeePatch(+id, body);
    }

    @Delete(':id')
    deleteEmployee(@Param('id') id: string) {
        return this.employeeService.deleteEmployee(+id);
    }
}
