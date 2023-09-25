import {
  Controller,
  Request,
  Body,
  Post,
  Put,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { Public } from '../decorators/public.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from './users.service';
import { User } from '@prisma/client';
import { CreateUserDto } from '../dto/create-user.dto';
import { CurrentUser } from '../decorators/current-user.decorator';

@Controller()
export class UsersController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Public()
  @Post('auth/register')
  async register(@Body() postData: CreateUserDto): Promise<User> {
    return this.usersService.createUser(postData);
  }

  @Put('auth/edit')
  async edit(
    @Body() postData: CreateUserDto,
    @CurrentUser() user: User,
  ): Promise<User> {
    return this.usersService.updateUser(user.id, postData);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
