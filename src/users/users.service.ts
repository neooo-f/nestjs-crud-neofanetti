import { Injectable } from '@nestjs/common';

// use prisma model later on
export type User = any;

@Injectable()
export class UsersService {
  // replace later with database entries / prisma model logic
  private readonly users = [
    {
      id: 1,
      username: 'neolf',
      password: 'changeme',
      name: 'Fanetti',
      firstName: 'Neo',
      age: 18,
      gender: 'Male',
    },
    {
      id: 2,
      username: 'marial.02r',
      password: '134jh12k312sd',
      name: 'Lavenda',
      firstName: 'Maria',
      age: 22,
      gender: 'Female',
    },
  ];

  async getUserByUsername(username: string): Promise<User | undefined> {
    // replace with prismaservice logic
    return this.users.find((user) => user.username === username);
  }
}
