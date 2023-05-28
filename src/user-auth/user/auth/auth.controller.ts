import { Body, Controller, Inject, Post, ClassSerializerInterceptor, UseInterceptors, UseGuards, Req, Patch, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { User } from '../user.entity';
import { JwtAuthGuard } from './auth.guard';
import { LoginDto, RegisterDto, UpdateUserDto } from './auth.dto';


@Controller('auth')
export class AuthController {
  @Inject(AuthService)
  private readonly service: AuthService;

  @Post('register')
  @UseInterceptors(ClassSerializerInterceptor)
  private register(@Body() body: RegisterDto) {
    return this.service.register(body);
  }

  @Post('login')
  private login(@Body() body: LoginDto): Promise<string | never> {
    return this.service.login(body);
  }

  @Post('refresh')
  @UseGuards(JwtAuthGuard)
  private refresh(@Req() { user }: Request): Promise<string | never> {
    return this.service.refresh(<User>user);
  }

  @Patch('users/:id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.service.update(+id, updateUserDto);
  }
}