import { Module } from '@nestjs/common';
import { BooksController } from './books/books.controller';
import { BooksService } from './books/books.service';
import { BooksModule } from './books/books.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [BooksModule],
  controllers: [BooksController],
  providers: [BooksService, PrismaService],
})
export class AppModule {}
