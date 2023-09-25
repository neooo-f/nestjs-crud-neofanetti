import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Book, User } from '@prisma/client';
import { CreateBookDto } from '../dto/create-book.dto';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  async getAllBooks(): Promise<Book[]> {
    return this.prisma.book.findMany({
      include: {
        user: true,
      },
    });
  }

  async getMyBooks(user: User): Promise<Book[] | null> {
    return this.prisma.book.findMany({
      where: { authorId: String(user.id) },
      //include: { user: true },
    });
  }

  async getBook(id: string): Promise<(Book & { user: User }) | null> {
    return this.prisma.book.findUnique({
      where: { id: String(id) },
      include: { user: true },
    });
  }

  async createBook(data: CreateBookDto, authorId: User['id']): Promise<Book> {
    return this.prisma.book.create({
      data: { ...data, authorId },
    });
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
