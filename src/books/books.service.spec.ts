import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';

describe('BooksService', () => {
  let booksService: BooksService;
  let prismaService: DeepMockProxy<PrismaClient>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BooksService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile();

    booksService = module.get<BooksService>(BooksService);
    prismaService = module.get(PrismaService);
  });

  describe(`createBook`, function () {
    it(`should create a new Book`, async function () {
      const mockedBook = {
        title: 'Jim Knopfs Abenteuer',
        publishingYear: '2005'
      };

      this.prismaService.book.create.mockResolvedValue(mockedBook);

      // Act
      const createBook = function () {
        this.booksService.createBook({ mockedBook });
      };

      // Assert
      await expect(createBook()).resolves.toBe(mockedBook);
    });
  });

  it('should be defined', () => {
    expect(booksService).toBeDefined();
  });
});
