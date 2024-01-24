import { Column, Entity, ManyToMany, PrimaryColumn } from "typeorm"
import { Weekdays } from "../enums/weekdays.enum"
import { Hours } from "../enums/hours.enum"

@Entity()
export class Mass {
    @PrimaryColumn({ nullable: false })
    UUID: string

    @Column({
        type: 'enum',
        enum: Weekdays
    })
    weekday: Weekdays

    @Column({
        type: 'enum',
        enum: Hours
    })
    hour: Hours

    @Column({ nullable: true })
    note: string
}
