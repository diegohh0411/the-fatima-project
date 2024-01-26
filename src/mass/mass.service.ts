import { Injectable } from '@nestjs/common';
import { CreateMassDto } from './dto/create-mass.dto';
import { UpdateMassDto } from './dto/update-mass.dto';
import { PaginationQueryDto } from 'src/common/dto/pagionation-query.dto';

import { BadRequestException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Mass } from './entities/mass.entity';
import { User } from 'src/user/entities/user.entity';
import { UserRoles } from 'src/user/enums/userRoles.enum';

@Injectable()
export class MassService {
  constructor(
    @InjectRepository(Mass)
    private readonly massRepository: Repository<Mass>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async create(createMassDto: CreateMassDto) {
    let celebratingPriestsUUIDs = createMassDto.celebratingPriestsUUIDs
    delete createMassDto.celebratingPriestsUUIDs
    const createMassObject = {
      ...(createMassDto as Omit<CreateMassDto, 'celebratingPriestsUUIDs'>),
      celebratingPriests: [] as User[]
    }
    if (celebratingPriestsUUIDs) {
      for (let i = 0; i < celebratingPriestsUUIDs.length; i++) {
        const priestUUID = celebratingPriestsUUIDs[i]
        const user = await this.userRepository.findOne({
          where: { UUID: priestUUID},
          relations: {
            massesToCelebrate: true
          }
        })
  
        if (!user) {
          throw new NotFoundException(`A user with UUID ${priestUUID} does not exist.`)
        } else if (user.role !== UserRoles.priest) {
          throw new BadRequestException(`The user with UUID ${priestUUID} does not have the role of ${UserRoles.priest}.`)
        }
  
        createMassObject.celebratingPriests.push(user)
      }
    } else {
      delete createMassObject.celebratingPriests
    }

    const newMass = await this.massRepository.create(createMassObject)
    newMass.UUID = crypto.randomUUID()
    try {
      await this.massRepository.save(newMass)
    } catch (e) {
      throw new BadRequestException(e.detail)
    }
    return newMass
  }

  async findAll(query: PaginationQueryDto) {
    const masses = await this.massRepository.find({
      skip: query.offset,
      take: query.limit,
      relations: {
        celebratingPriests: true
      }
    })
    return masses
  }

  async findOne(UUID: string) {
    const mass = await this.massRepository.findOne({
      where: {
        UUID: UUID
      },
      relations: {
        celebratingPriests: true
      }
    })
    if (!mass) {
      throw new NotFoundException('A mass with that UUID does not exist.')
    }
    return mass
  }

  async update(updateMassDto: UpdateMassDto) {
    let celebratingPriestsUUIDs = updateMassDto.celebratingPriestsUUIDs
    delete updateMassDto.celebratingPriestsUUIDs
    const updateMassObject = {
      ...(updateMassDto as Omit<UpdateMassDto, 'celebratingPriestsUUIDs'>),
      celebratingPriests: [] as User[]
    }
    if (celebratingPriestsUUIDs) {
      for (let i = 0; i < celebratingPriestsUUIDs.length; i++) {
        const priestUUID = celebratingPriestsUUIDs[i]
        const user = await this.userRepository.findOne({
          where: { UUID: priestUUID},
          relations: {
            massesToCelebrate: true
          }
        })
  
        if (!user) {
          throw new NotFoundException(`A user with UUID ${priestUUID} does not exist.`)
        } else if (user.role !== UserRoles.priest) {
          throw new BadRequestException(`The user with UUID ${priestUUID} does not have the role of ${UserRoles.priest}.`)
        }
  
        updateMassObject.celebratingPriests.push(user)
      }
    } else {
      delete updateMassObject.celebratingPriests
    }

    const updatedMass = await this.massRepository.preload({
      ...updateMassObject
    })
    if (!updatedMass) {
      throw new NotFoundException('A mass with that UUID does not exist.')
    }

    try {
      await this.massRepository.save(updatedMass)
    } catch (e) {
      throw new BadRequestException(e.detail)
    }
    return updatedMass     
  }

  async remove(UUID: string) {
    const mass = await this.findOne(UUID)
    return this.massRepository.remove(mass)
  }
}
