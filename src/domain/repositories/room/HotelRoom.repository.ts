import { EntityRepository, Repository } from 'typeorm';
import { HotelRoom } from '../../entities/room/HotelRoom.entity';
import { Reservation } from 'src/domain/entities/reservation/reservation.entity';
import { InjectRepository } from '@nestjs/typeorm';


export class HotelRoomRepository extends Repository<HotelRoom> {
    constructor(
        @InjectRepository(HotelRoom)
        private hotelRoomRepository: Repository<HotelRoom>
    ) {
        super(hotelRoomRepository.target, hotelRoomRepository.manager, hotelRoomRepository.queryRunner)
    }
    async saveReservation(reservation: Reservation): Promise<Reservation> {
        return this.hotelRoomRepository.save(reservation);
    }
}
