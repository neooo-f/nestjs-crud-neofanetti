import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Book } from '@prisma/client';
import { CreateBookDto } from '../dto/create-book.dto';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  async getAllBooks(): Promise<Book[]> {
    return this.prisma.book.findMany({
      include: {
        author: true,
      },
    });
  }

  async getBook(id: string): Promise<Book | null> {
    return this.prisma.book.findUnique({
      where: { id: String(id) },
      include: { author: true },
    });
  }

  async createBook(data: CreateBookDto): Promise<Book> {
    return this.prisma.book.create({ data });
  }

  async updateBook(id: string, book: Book): Promise<Book> {
    return this.prisma.book.update({
      where: { id: String(id) },
      data: book,
    });
  }

  async deleteBook(id: string): Promise<Book> {
    return this.prisma.book.delete({
      where: { id: String(id) },
    });
  }
}
