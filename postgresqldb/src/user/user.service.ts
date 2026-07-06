import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }
    async createUser(user: User): Promise<User> {
        return this.userRepository.save(user);
    }

    async getAllUsers(): Promise<User[]> {
        return this.userRepository.find();
    }

    async getUser(id: number): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException("User not found");
        }
        return user;
    }

    async updateUser(id: number, user: User): Promise<User> {
        const oldUser = await this.getUser(id);
        if (!oldUser) {
            throw new NotFoundException("User not found");
        }
        await this.userRepository.update(id, user);
        return user;
    }

    async deleteUser(id: number): Promise<User> {
        const user = await this.getUser(id);
        if (!user) {
            throw new NotFoundException("User not found");
        }
        await this.userRepository.delete(id);
        return user;
    }

    async searchUsers(filter: {
        name?: string;
        email?: string;
        age?: number;
    }): Promise<User[]> {
        let query = this.userRepository.createQueryBuilder('user');
        if (filter.name) {
            query = query.andWhere('user.name ILIKE :name', { name: `%${filter.name}%` });
        }
        if (filter.email) {
            query = query.andWhere('user.email ILIKE :email', { email: `%${filter.email}%` });
        }
        if (filter.age) {
            query = query.andWhere('user.age = :age', { age: filter.age });
        }
        return query.getMany();
    }
}
