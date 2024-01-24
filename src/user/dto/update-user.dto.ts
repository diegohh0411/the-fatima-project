import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { UserRoles } from '../enums/user.enum';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsString()
    UUID: string

    @IsOptional()
    @IsEnum(UserRoles)
    role: UserRoles
}
