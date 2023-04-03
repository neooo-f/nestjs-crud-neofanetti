import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return this.prisma.user.findUnique({
      where: { username: String(username) },
    });
  }

}
