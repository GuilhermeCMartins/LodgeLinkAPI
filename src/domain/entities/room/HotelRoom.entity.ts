import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Reservation } from '../reservation/reservation.entity';


@Entity()
export class HotelRoom {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    pricePerNight: number;

    @Column()
    capacity: number;

    @Column()
    isAvailable: boolean;

    @Column({ type: 'json', nullable: true })
    onPromotion: { status: boolean; newPrice: number; initialDate: Date; endDate: Date };

    @Column({ nullable: true })
    imageURL: string;

    @OneToMany(() => Reservation, reservation => reservation.room)
    reservations: Reservation[];
}
