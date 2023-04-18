import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  ForbiddenException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { BooksService } from '../books/books.service';
import { ErrorCodes } from '../enums/ErrorCodes.enum';

@Injectable()
export class IsAuthorInterceptor implements NestInterceptor {
  constructor(private readonly booksService: BooksService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<unknown>> {
    const request = context.switchToHttp().getRequest();
    const { id: bookId } = request.params;
    const book = await this.booksService.getBook(bookId);

    if (!book || book.user.username !== request.user.username) {
      throw new ForbiddenException(ErrorCodes.NO_ACCESS);
    }

    return next.handle();
  }
}
