import { Injectable } from '@nestjs/common';
import { CreateMassDto } from './dto/create-mass.dto';
import { UpdateMassDto } from './dto/update-mass.dto';
import { PaginationQueryDto } from 'src/common/dto/pagionation-query.dto';

import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Mass } from './entities/mass.entity';

@Injectable()
export class MassService {
  constructor(
    @InjectRepository(Mass)
    private readonly massRepository: Repository<Mass>
  ) {}

  async create(createMassDto: CreateMassDto) {
    const newMass = await this.massRepository.create(createMassDto)
    newMass.UUID = crypto.randomUUID()
    await this.massRepository.save(newMass)
    return newMass
  }

  async findAll(query: PaginationQueryDto) {
    const masses = await this.massRepository.find({
      skip: query.offset,
      take: query.limit
    })
    return masses
  }

  async findOne(UUID: string) {
    const mass = await this.massRepository.findOne({
      where: {
        UUID: UUID
      }
    })
    if (!mass) {
      throw new NotFoundException('A mass with that UUID does not exist.')
    }
    return mass
  }

  async update(updateMassDto: UpdateMassDto) {
    const updatedMass = await this.massRepository.preload({
      ...updateMassDto
    })
    if (!updatedMass) {
      throw new NotFoundException('A mass with that UUID does not exist.')
    }
    await this.massRepository.save(updatedMass)
    return updatedMass
  }

  async remove(UUID: string) {
    const mass = await this.findOne(UUID)
    return this.massRepository.remove(mass)
  }
}
