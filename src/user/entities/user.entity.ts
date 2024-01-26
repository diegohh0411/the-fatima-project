import { Column, Entity, ManyToMany, PrimaryColumn } from "typeorm"
import { UserRoles } from "../enums/userRoles.enum"
import { Mass } from "src/mass/entities/mass.entity"

@Entity()
export class User {
    @PrimaryColumn({ nullable: false })
    UUID: string

    @Column({ unique: true })
    email: string

    @Column()
    first_name: string

    @Column({ nullable: true })
    last_name: string

    @Column({ nullable: true })
    about: string

    @Column({
        type: 'enum',
        enum: UserRoles
    })
    role: UserRoles

    @ManyToMany(
        type => Mass,
        mass => mass.celebratingPriests
    )
    massesToCelebrate: Mass[]
}
