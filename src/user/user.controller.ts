import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationQueryDto } from 'src/common/dto/pagionation-query.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(@Body() query: PaginationQueryDto) {
    return this.userService.findAll(query);
  }

  @Get(':UUID')
  findOne(@Param('UUID') UUID: string) {
    return this.userService.findOne(UUID);
  }

  @Patch()
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto);
  }

  @Delete(':UUID')
  remove(@Param('UUID') UUID: string) {
    return this.userService.remove(UUID);
  }
}
