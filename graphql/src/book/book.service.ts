import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from './model/book.model';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';

@Injectable()
export class BookService {
    constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) { }

    async create(input: CreateBookInput): Promise<Book> {
        return this.bookModel.create(input);
    }

    async findAll(): Promise<Book[]> {
        return this.bookModel.find().exec();
    }

    async findById(id: string): Promise<Book> {
        const book = await this.bookModel.findById(id).exec();
        if (!book) {
            throw new NotFoundException('Book not found');
        }
        return book;
    }

    async update(id: string, input: UpdateBookInput): Promise<Book> {
        const book = await this.bookModel.findByIdAndUpdate(id, input, { new: true }).exec();
        if (!book) {
            throw new NotFoundException('Book not found');
        }
        return book;
    }

    async delete(id: string): Promise<Book> {
        const book = await this.bookModel.findByIdAndDelete(id).exec();
        if (!book) {
            throw new NotFoundException('Book not found');
        }
        return book;
    }
}
