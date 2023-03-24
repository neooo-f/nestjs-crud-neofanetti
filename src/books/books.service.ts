import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Book, Prisma } from '@prisma/client';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  async getAllBooks(): Promise<Book[]> {
    return this.prisma.book.findMany();
  }

  async getBook(id: number): Promise<Book | null> {
    return this.prisma.book.findUnique({ where: { id: Number(id) } });
  }

  async createBook(data: Book): Promise<Book> {
    return this.prisma.book.create({ data });
  }

  async updateBook(id: number, book: Book): Promise<Book> {
    return this.prisma.book.update({
      where: { id: Number(id) },
      data: book,
    });
  }

  async deleteBook(id: number): Promise<Book> {
    return this.prisma.book.delete({
      where: { id: Number(id) },
    });
  }
}
