import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { StudentService } from './student.service';
import { Student } from './student.schema';

@Controller('student')
export class StudentController {
    constructor(private readonly studentService: StudentService) { }

    @Post()
    async createStudent(@Body() student: Student): Promise<Student> {
        return this.studentService.createStudent(student);
    }

    @Get()
    async getAllStudents(): Promise<Student[]> {
        return this.studentService.getAllStudents();
    }

    @Get(':id')
    async getStudent(@Param('id') id: string): Promise<Student> {
        return this.studentService.getStudent(id);
    }

    @Put(':id')
    async updateStudent(@Param('id') id: string, @Body() student: Student): Promise<Student> {
        return this.studentService.updateStudent(id, student);
    }

    @Patch(':id')
    async patchStudent(@Param('id') id: string, @Body() student: Student): Promise<Student> {
        return this.studentService.patchStudent(id, student);
    }

    @Delete(':id')
    async deleteStudent(@Param('id') id: string): Promise<Student> {
        return this.studentService.deleteStudent(id);
    }
}
