import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { hash } from 'bcrypt';
import { CreateUserDto } from '../dto/create-user.dto';

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

  async createUser(data: CreateUserDto): Promise<User> {
    data.password = await hash(data.password, 10);
    return this.prisma.user.create({ data });
  }

  // TODO: only the own user can update his own profile
  async updateUser(id: string, user: CreateUserDto): Promise<User> {
    return this.prisma.user.update({
      where: { id: String(id) },
      data: user,
    });
  }
}
