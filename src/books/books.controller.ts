import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from '@prisma/client';
import { CreateBookDto } from './validation/create-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  // Gets all Books
  @Get()
  async getAllBooks(): Promise<Book[]> {
    return this.booksService.getAllBooks();
  }

  // Get one specific Book by his id
  @Get(':id')
  async getBook(@Param('id') id: string): Promise<Book | null> {
    return this.booksService.getBook(id);
  }

  // Creates a new Book
  @Post()
  async createBook(@Body() postData: CreateBookDto): Promise<Book> {
    return this.booksService.createBook(postData);
  }

  // Updates an existing Book by his id
  @Put(':id')
  async updateBook(@Param('id') id: string, @Body() book: Book): Promise<Book> {
    return this.booksService.updateBook(id, book);
  }

  // Deletes a Book by his id
  @Delete(':id')
  async deleteBook(@Param('id') id: string): Promise<Book> {
    return this.booksService.deleteBook(id);
  }
}
