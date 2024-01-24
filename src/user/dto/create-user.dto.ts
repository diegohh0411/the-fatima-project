import { IsString, IsOptional } from "class-validator"

export class CreateUserDto {
    @IsString()
    email: string

    @IsString()
    first_name: string

    @IsString()
    @IsOptional()
    last_name: string
}
