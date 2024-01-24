import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MassService } from './mass.service';
import { CreateMassDto } from './dto/create-mass.dto';
import { UpdateMassDto } from './dto/update-mass.dto';
import { PaginationQueryDto } from 'src/common/dto/pagionation-query.dto';

@Controller('mass')
export class MassController {
  constructor(private readonly massService: MassService) {}

  @Post()
  create(@Body() createMassDto: CreateMassDto) {
    return this.massService.create(createMassDto);
  }

  @Get()
  findAll(@Body() query: PaginationQueryDto) {
    return this.massService.findAll(query);
  }

  @Get(':UUID')
  findOne(@Param('UUID') UUID: string) {
    return this.massService.findOne(UUID);
  }

  @Patch()
  update(@Body() updateMassDto: UpdateMassDto) {
    return this.massService.update(updateMassDto);
  }

  @Delete(':UUID')
  remove(@Param('UUID') UUID: string) {
    return this.massService.remove(UUID);
  }
}
