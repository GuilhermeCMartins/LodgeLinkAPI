import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from 'src/domain/entities/reservation/reservation.entity';
import { HotelRoom } from 'src/domain/entities/room/HotelRoom.entity';
import { User } from 'src/domain/entities/user/user.entity';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { SimpleReservation } from 'src/utils/interfaces/SimpleReservation.interface';
import { NotFoundException } from 'src/domain/exceptions/NotFoundException';
import { ConflictException } from 'src/domain/exceptions/ConflictException';
import { ReservationRepository } from 'src/domain/repositories/reservation/reservation.repository';
import NewReservation from 'src/utils/interfaces/NewReservation.interface';


@Injectable()
export class ReservationService {
    constructor(
        private reservationRepository: ReservationRepository
    ) { }

    async createReservation(user: User, room: HotelRoom, reservationData: Partial<Reservation>): Promise<NewReservation> {
        const isRoomAllocated = await this.isRoomAllocated(room, reservationData.checkIn, reservationData.checkOut);

        if (isRoomAllocated) {
            throw new ConflictException('Room is already allocated for the specified dates.');
        }

        const reservation = this.reservationRepository.create({
            ...reservationData,
            user: user,
            room: room
        });

        const newReservation = await this.reservationRepository.save(reservation)

        const displayReservation: NewReservation = {
            checkIn: newReservation.checkIn,
            checkOut: newReservation.checkOut,
            user: {
                id: newReservation.user.id,
                firstName: newReservation.user.firstName,
                lastName: newReservation.user.lastName,
                email: newReservation.user.email,
            },
            room: {
                id: newReservation.room.id,
                name: newReservation.room.name,
            },
            id: newReservation.id
        };

        return displayReservation;
    }

    async getReservationsByUser(user: User): Promise<SimpleReservation[]> {
        const reservations = await this.reservationRepository.find({
            where: {
                user: { id: user.id },
            },
            relations: ['room', 'user'],
        });

        const simpleReservations: SimpleReservation[] = reservations.map(reservation => ({
            id: reservation.id,
            checkIn: reservation.checkIn,
            checkOut: reservation.checkOut,
            roomId: reservation.room.id,
            roomName: reservation.room.name,
            userId: reservation.user.id,
            username: reservation.user.firstName,
        }));

        if (!simpleReservations.length) {
            return null
        }

        return simpleReservations;
    }

    async isRoomAllocated(room: HotelRoom, checkIn: Date, checkOut: Date): Promise<boolean> {
        const existingReservations = await this.reservationRepository.find({
            where: {
                room: room,
                checkIn: LessThanOrEqual(checkOut),
                checkOut: MoreThanOrEqual(checkIn)
            }
        });

        return existingReservations.length > 0;
    }

}
