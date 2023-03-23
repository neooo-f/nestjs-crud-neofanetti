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

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async getAllBooks(): Promise<Book[]> {
    return this.booksService.getAllBooks();
  }

  @Get(':id')
  async getBook(@Param('id') id: number): Promise<Book | null> {
    return this.booksService.getBook(id);
  }

  @Post()
  async createBook(@Body() postData: Book): Promise<Book> {
    return this.booksService.createBook(postData);
  }

  @Put(':id')
  async updateBook(@Param('id') id: number): Promise<Book> {
    return this.booksService.updateBook(id);
  }

  @Delete(':id')
  async deleteBook(@Param('id') id: number): Promise<Book> {
    return this.booksService.deleteBook(id);
  }
}
