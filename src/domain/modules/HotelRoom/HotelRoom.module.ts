import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelRoom } from '../../entities/room/HotelRoom.entity';
import { Reservation } from '../../entities/reservation/reservation.entity';
import { HotelRoomRepository } from '../../repositories/room/HotelRoom.repository';
import { HotelRoomService } from '../../services/room/HotelRoom.service';
import { HotelRoomController } from 'src/application/controllers/room/HotelRoom.controller';
import { ReservationRepository } from 'src/domain/repositories/reservation/Reservation.repository';


@Module({
    imports: [TypeOrmModule.forFeature([HotelRoom, Reservation])],
    providers: [HotelRoomService, HotelRoomRepository, ReservationRepository],
    controllers: [HotelRoomController],
    exports: [HotelRoomService, HotelRoomRepository]
})
export class HotelRoomModule { }
