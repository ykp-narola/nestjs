import { Injectable, NotFoundException } from '@nestjs/common';
import { Employee } from './interfaces/employee.interface';
import { CreateEmployeeDto } from './dto/create-employee.dto';

@Injectable()
export class EmployeeService {
    private employees: Employee[] = [
        {
            id: 1,
            name: 'Employee 1',
            age: 20
        },
        {
            id: 2,
            name: 'Employee 2',
            age: 25
        },
        {
            id: 3,
            name: 'Employee 3',
            age: 30
        }
    ];

    getAllEmployees(): Employee[] {
        return this.employees;
    }

    getEmployeeById(id: number): Employee {
        let student = this.employees.find(employee => employee.id === id);
        if (!student) throw new NotFoundException(`Employee with id ${id} not found`);
        return student;
    }

    // POST
    // createEmployee( employee: { name: string, age: number }):Employee {
    createEmployee(employee: CreateEmployeeDto): Employee {
        const newEmp: Employee = {
            id: this.employees.length + 1,
            name: employee.name,
            age: employee.age
        }
        this.employees.push(newEmp);
        return newEmp;
    }

    // PUT
    updateEmployee(id: number, data: Employee): Employee {
        const index = this.employees.findIndex(emp => emp.id === id);
        if (index === -1) throw new NotFoundException(`Employee with id ${id} not found`);

        this.employees[index] = {
            ...this.employees[index],
            ...data
        }
        return this.employees[index];
    }

    // PATCH
    updateEmployeePatch(id: number, data: Partial<Employee>): Employee {
        const employee = this.getEmployeeById(id);
        Object.assign(employee, data);
        return employee;
    }

    // DELETE
    deleteEmployee(id: number): { message: string } {
        const index = this.employees.findIndex(emp => emp.id === id);
        if (index === -1) throw new NotFoundException(`Employee with id ${id} not found`);

        this.employees.splice(index, 1);
        return { message: `Employee with id ${id} deleted successfully` };
    }
}
