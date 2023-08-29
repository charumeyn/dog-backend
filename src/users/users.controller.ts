import { BadRequestException, Body, Controller, Get, Param, Patch, Post, Req, Res, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { Response, Request } from "express";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

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

  @Patch('/account/:id')
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.usersService.update(+id, dto);
  }
}
