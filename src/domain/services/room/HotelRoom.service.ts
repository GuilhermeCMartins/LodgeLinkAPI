import { Injectable } from '@nestjs/common';
import { Reservation } from 'src/domain/entities/reservation/reservation.entity';
import { HotelRoom } from 'src/domain/entities/room/HotelRoom.entity';
import { ReservationRepository } from 'src/domain/repositories/reservation/Reservation.repository';
import { HotelRoomRepository } from 'src/domain/repositories/room/HotelRoom.repository';


@Injectable()
export class HotelRoomService {
    constructor(
        private readonly hotelRoomRepository: HotelRoomRepository,
        private readonly reservationRepository: ReservationRepository,
    ) {
    }

    async findAll(): Promise<HotelRoom[]> {
        try {
            return await this.hotelRoomRepository.find();
        } catch (error) {
            console.error('Error in findAll():', error);
            throw error;
        }
    }

    async findById(id: number): Promise<HotelRoom> {
        return this.hotelRoomRepository.findOne({ where: { id: id } });
    }

    async save(hotelRoom: Partial<HotelRoom>): Promise<HotelRoom> {
        return this.hotelRoomRepository.save(hotelRoom);
    }

    async update(id: number, hotelRoom: Partial<HotelRoom>): Promise<HotelRoom> {
        await this.hotelRoomRepository.update(id, hotelRoom);
        return this.hotelRoomRepository.findOne({ where: { id: id } });
    }

    async delete(id: number): Promise<void> {
        await this.hotelRoomRepository.delete(id);
    }

    async saveReservation(
        roomId: number,
        checkInDate: Date,
        checkOutDate: Date,
    ): Promise<Reservation> {
        const room = await this.findById(roomId);
        if (!room) {
            throw new Error('Quarto não encontrado');
        }

        if (!room.isAvailable) {
            throw new Error('Quarto indisponível');
        }

        const reservation = new Reservation();
        reservation.room = room;
        reservation.checkIn = checkInDate;
        reservation.checkOut = checkOutDate;

        room.isAvailable = false;

        await this.hotelRoomRepository.save(room);
        return this.reservationRepository.saveReservation(reservation);
    }
}
