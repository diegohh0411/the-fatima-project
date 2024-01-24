import { Column, Entity, ManyToMany, PrimaryColumn, JoinTable } from "typeorm"
import { Weekdays } from "../enums/weekdays.enum"
import { Hours } from "../enums/hours.enum"

import { User } from "src/user/entities/user.entity"

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

    @JoinTable()
    @ManyToMany(
        type => User,
        user => user.massesToCelebrate,
        {
            cascade: ['update']
        }
    )
    celebratingPriests: User[]
}
