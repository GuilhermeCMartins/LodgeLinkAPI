import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { HotelRoom } from '../room/HotelRoom.entity';


@Entity()
export class Reservation {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.reservations)
    user: User;

    @ManyToOne(() => HotelRoom, room => room.reservations)
    @JoinColumn()
    room: HotelRoom;

    @Column()
    checkIn: Date;

    @Column()
    checkOut: Date;
}
