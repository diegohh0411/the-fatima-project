import { Column, Entity, ManyToMany, PrimaryColumn, JoinTable } from "typeorm"

import { User } from "src/user/entities/user.entity"

@Entity()
export class Mass {
    @PrimaryColumn({ nullable: false })
    UUID: string

    @Column({ unique: true })
    recurrence: string

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
