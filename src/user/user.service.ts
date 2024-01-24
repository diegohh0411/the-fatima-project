import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationQueryDto } from 'src/common/dto/pagionation-query.dto';

import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { UserRoles } from './enums/userRoles.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepository.findOne({ where: { email: createUserDto.email }})

    if (existingUser) {
      throw new BadRequestException(`A user with that email already exists.`)
    }

    const newUser = await this.userRepository.create(createUserDto)
    newUser.UUID = crypto.randomUUID()
    newUser.role = UserRoles.admin
    await this.userRepository.save(newUser)

    return newUser
  }

  async findAll(query: PaginationQueryDto) {
    const users = await this.userRepository.find({
      skip: query.offset,
      take: query.limit,
      relations: {
        massesToCelebrate: true
      }
    })
    return users
  }

  async findOne(UUID: string) {
    const user = await this.userRepository.findOne({
      where: {
        UUID: UUID
      },
      relations: {
        massesToCelebrate: true
      }
    })
    if (!user) {
      throw new NotFoundException('A user with that UUID does not exist.')
    }
    return user
  }

  async update(updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userRepository.preload({
      ...updateUserDto
    })
    if (!updatedUser) {
      throw new NotFoundException('A user with that UUID does not exist.')
    }
    await this.userRepository.save(updatedUser)
    return updatedUser
  }

  async remove(UUID: string) {
    const user = await this.findOne(UUID)
    return this.userRepository.remove(user)
  }
}
