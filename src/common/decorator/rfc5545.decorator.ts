import { BadRequestException } from "@nestjs/common"
import { registerDecorator} from "class-validator"
import { rrulestr } from "rrule"

export function IsRFC5545() {
    return function(object: any, propertyName: string) {
        registerDecorator({
            name: "isRFC5545",
            target: object.constructor,
            propertyName: propertyName,
            validator: {
                validate(value: any) {
                    try {
                        const rfc5545 = rrulestr(value)
                        return true
                    } catch (e) {
                        throw new BadRequestException(`${propertyName} should be a valid RFC5545 string`)
                    }
                }
            }
        })
    }
}