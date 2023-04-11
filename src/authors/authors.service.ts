import { Injectable } from '@nestjs/common';
import { Author } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAuthorDTO } from '../dto/create-author.dto';

@Injectable()
export class AuthorsService {
  constructor(private prisma: PrismaService) {}

  async getAllAuthors(): Promise<Author[]> {
    return this.prisma.author.findMany();
  }

  async getAuthor(id: string): Promise<Author | null> {
    return this.prisma.author.findUnique({ where: { id: String(id) } });
  }

  async createAuthor(data: CreateAuthorDTO): Promise<Author> {
    return this.prisma.author.create({ data });
  }

  async updateAuthor(id: string, author: Author): Promise<Author> {
    return this.prisma.author.update({
      where: { id: String(id) },
      data: author,
    });
  }

  async deleteAuthor(id: string): Promise<Author> {
    return this.prisma.author.delete({
      where: { id: String(id) },
    });
  }
}
