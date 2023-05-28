import { ClassSerializerInterceptor, Controller, Req, UseGuards, UseInterceptors, Put, Body, Inject, Query, Get, Param, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

@Controller('users')
export class UserController {
  @Inject(UserService)
  readonly userService: UserService;

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.userService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(+id);
  }
}