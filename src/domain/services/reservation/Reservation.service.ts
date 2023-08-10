import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from 'src/domain/entities/reservation/reservation.entity';
import { HotelRoom } from 'src/domain/entities/room/HotelRoom.entity';
import { User } from 'src/domain/entities/user/user.entity';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { SimpleReservation } from 'src/utils/interfaces/SimpleReservation.interface';
import { NotFoundException } from 'src/domain/exceptions/NotFoundException';
import { ConflictException } from 'src/domain/exceptions/ConflictException';




@Injectable()
export class ReservationService {
    constructor(
        @InjectRepository(Reservation)
        private reservationRepository: Repository<Reservation>
    ) { }

    async createReservation(user: User, room: HotelRoom, reservationData: Partial<Reservation>): Promise<Reservation> {
        const isRoomAllocated = await this.isRoomAllocated(room, reservationData.checkIn, reservationData.checkOut);

        if (isRoomAllocated) {
            throw new ConflictException('Room is already allocated for the specified dates.');
        }

        const reservation = this.reservationRepository.create({
            ...reservationData,
            user: user,
            room: room
        });

        // Mudar o retorno
        return this.reservationRepository.save(reservation);
    }

    async getReservationsByUser(userId: number): Promise<SimpleReservation[]> {
        const reservations = await this.reservationRepository.find({
            where: {
                user: { id: userId },
            },
            relations: ['room', 'user'],
        });

        if (!reservations) {
            throw new NotFoundException('Not found any reservations for userId')
        }

        const simpleReservations: SimpleReservation[] = reservations.map(reservation => ({
            id: reservation.id,
            checkIn: reservation.checkIn,
            checkOut: reservation.checkOut,
            roomId: reservation.room.id,
            roomName: reservation.room.name,
            userId: reservation.user.id,
            username: reservation.user.firstName,
        }));

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
