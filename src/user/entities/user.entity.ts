import { Column, Entity, ManyToMany, PrimaryColumn } from "typeorm"
import { UserRoles } from "../enums/user.enum"

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

    @Column({
        type: 'enum',
        enum: UserRoles
    })
    role: UserRoles
}
