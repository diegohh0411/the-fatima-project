import { IsString, IsOptional, IsEnum } from "class-validator"
import { IsRFC5545 } from "src/common/decorator/rfc5545.decorator"

export class CreateMassDto {
    @IsRFC5545()
    recurrence: string

    @IsString()
    @IsOptional()
    note: string

    @IsOptional()
    celebratingPriestsUUIDs: string[]
}
