import { IsString, IsOptional, IsEnum } from "class-validator"
import { Weekdays } from "../enums/weekdays.enum"
import { Hours } from "../enums/hours.enum"

export class CreateMassDto {
    @IsEnum(Weekdays)
    weekday: Weekdays

    @IsEnum(Hours)
    hour: Hours

    @IsString()
    @IsOptional()
    note: string
}
