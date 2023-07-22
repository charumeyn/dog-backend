import { BadRequestException, Body, Controller, Get, Post, Req, Res, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "./users.service";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { Response, Request } from "express";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('/auth/register')
  async register(@Body() dto: RegisterDto) {
    return this.usersService.register(dto)
  }

  @Post('/auth/login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) response: Response
  ) {
    return this.usersService.login(dto, response)
  }

  @Get('/auth/account')
  async account(@Req() request: Request) {
    return this.usersService.account(request)
  }

  @Post('/auth/logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    return this.usersService.logout(response)
  }
}
