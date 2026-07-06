import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StudentDocument, Student } from './student.schema';

@Injectable()
export class StudentService {
    constructor(@InjectModel(Student.name) private readonly studentModel: Model<StudentDocument>) { }

    async createStudent(student: Partial<Student>): Promise<Student> {
        const newStudent = new this.studentModel(student);
        return await newStudent.save();
    }

    async getStudent(id: string): Promise<Student> {
        const student = await this.studentModel.findById(id).exec();
        if (!student) {
            throw new Error('Student not found');
        }
        return student;
    }

    async getAllStudents(): Promise<Student[]> {
        return await this.studentModel.find().exec();
    }

    async updateStudent(id: string, student: Student): Promise<Student> {
        const updatedStudent = await this.studentModel.findByIdAndUpdate(id, {
            name: student.name || null,
            age: student.age || null,
            email: student.email || null
        }, { new: true }).exec();
        if (!updatedStudent) {
            throw new Error('Student not found');
        }
        return updatedStudent;
    }

    async patchStudent(id: string, student: Student): Promise<Student> {
        const updatedStudent = await this.studentModel.findByIdAndUpdate(id, student, { new: true }).exec();
        if (!updatedStudent) {
            throw new Error('Student not found');
        }
        return updatedStudent;
    }

    async deleteStudent(id: string): Promise<Student> {
        const deletedStudent = await this.studentModel.findByIdAndDelete(id).exec();
        if (!deletedStudent) {
            throw new Error('Student not found');
        }
        return deletedStudent;
    }
}
