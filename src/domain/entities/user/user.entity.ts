import { UserRole } from 'src/domain/enums/user-role.enum';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Reservation } from '../reservation/reservation.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    role: UserRole = 2;

    @Column({ unique: true })
    cpf: string;

    @OneToMany(() => Reservation, reservation => reservation.user)
    reservations: Reservation[];
}
