import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseInterceptors,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { Book, User } from '@prisma/client';
import { CreateBookDto } from '../dto/create-book.dto';
import { CurrentUser } from '../decorators/current-user.decorator';
import { IsAuthorInterceptor } from '../interceptors/is-author.interceptor';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async getAllBooks(): Promise<Book[]> {
    return this.booksService.getAllBooks();
  }

  @Get('my')
  async getMyBooks(@CurrentUser() user: User): Promise<Book[]> {
    return this.booksService.getMyBooks(user);
  }

  @Get(':id')
  @UseInterceptors(IsAuthorInterceptor)
  async getBook(
    @Param('id') id: string,
  ): Promise<(Book & { user: User }) | null> {
    return this.booksService.getBook(id);
  }

  @Post()
  async createBook(
    @Body() postData: CreateBookDto,
    @CurrentUser() user: User,
  ): Promise<Book> {
    return this.booksService.createBook(postData, user.id);
  }

  @Put(':id')
  @UseInterceptors(IsAuthorInterceptor)
  async updateBook(@Param('id') id: string, @Body() book: Book): Promise<Book> {
    return this.booksService.updateBook(id, book);
  }

  @Delete(':id')
  @UseInterceptors(IsAuthorInterceptor)
  async deleteBook(@Param('id') id: string): Promise<Book> {
    return this.booksService.deleteBook(id);
  }
}
