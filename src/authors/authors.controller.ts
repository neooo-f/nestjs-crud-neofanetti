import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { Author } from '@prisma/client';
import { AuthorsService } from './authors.service';
import { CreateAuthorDTO } from '../dto/create-author.dto';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  // Get all Authors
  @Get()
  async getAllAuthors(): Promise<Author[]> {
    return this.authorsService.getAllAuthors();
  }

  // Get one specific Author by his id
  @Get(':id')
  async getAuthor(@Param('id') id: string): Promise<Author | null> {
    return this.authorsService.getAuthor(id);
  }

  // Creates a new Author
  @Post()
  async createAuthor(@Body() postData: CreateAuthorDTO): Promise<Author> {
    return this.authorsService.createAuthor(postData);
  }

  // Updates an existring Author by his id
  @Put(':id')
  async updateAuthor(
    @Param('id') id: string,
    @Body() author: Author,
  ): Promise<Author> {
    return this.authorsService.updateAuthor(id, author);
  }

  // Deletes an Author by his id
  @Delete(':id')
  async deleteAuthor(@Param('id') id: string): Promise<Author> {
    return this.authorsService.deleteAuthor(id);
  }
}
