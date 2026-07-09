import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Query } from '@nestjs/graphql';
import { BookService } from '../book.service';
import { Book } from '../model/book.model';
import { CreateBookInput } from '../dto/create-book.input';
import { UpdateBookInput } from '../dto/update-book.input';

// nest g resolver book/resolvers/book --flat    // for create resolvers

@Resolver(() => Book)
export class BookResolver {
    constructor(private readonly bookService: BookService) { }

    @Query(() => [Book], { name: "getAllBooks" })
    async findAll(): Promise<Book[]> {
        return this.bookService.findAll();
    }

    @Query(() => Book, { name: "getBookById", complexity: 2 })
    async findById(@Args("id") id: string): Promise<Book> {
        return this.bookService.findById(id);
    }

    @Mutation(() => Book, { name: "createBook" })
    async create(@Args("createBookInput") input: CreateBookInput): Promise<Book> {
        return this.bookService.create(input);
    }

    @Mutation(() => Book, { name: "updateBook" })
    async update(@Args("updateBookInput") input: UpdateBookInput): Promise<Book> {
        return this.bookService.update(input.id, input);
    }

    @Mutation(() => Book, { name: "deleteBook" })
    async delete(@Args("id") id: string): Promise<Book> {
        return this.bookService.delete(id);
    }
}


// localhost:3000/graphql

// mutation {
//   createBook(createBookInput: {
//     title:"nestJs",
//     author: "test"
//   }){
//     _id,
//     title,
//     author
//   }
// }


// query {
//   getAllBooks{
//     _id,
//     title,
//     author
//   }
// }



// query {
//  	getBookById(id: "6a4f43f8ca0ad45a7c53759a") {
//     _id,
//     title
//   }
// }


// mutation {
//   deleteBook(id: "6a4f43f8ca0ad45a7c53759a") {
//     _id,
//     title
//   }
// }


// mutation {
//   updateBook(updateBookInput: {
//     id: "6a4f4418ca0ad45a7c53759b",
//     title: "Yash",
//     author: "yash",
//     description:"yash description"
//   }) {
//     title,
//     description,
//     author
//   }
// }