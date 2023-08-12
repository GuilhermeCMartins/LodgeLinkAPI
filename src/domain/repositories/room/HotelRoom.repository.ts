import { Repository } from 'typeorm';
import { HotelRoom } from '../../entities/room/HotelRoom.entity';
import { InjectRepository } from '@nestjs/typeorm';


export class HotelRoomRepository extends Repository<HotelRoom> {
    constructor(
        @InjectRepository(HotelRoom)
        private hotelRoomRepository: Repository<HotelRoom>
    ) {
        super(hotelRoomRepository.target, hotelRoomRepository.manager, hotelRoomRepository.queryRunner)
    }

}
