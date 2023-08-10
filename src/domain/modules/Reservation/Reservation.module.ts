import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationController } from 'src/application/controllers/reservation/reservation.controller';
import { Reservation } from 'src/domain/entities/reservation/reservation.entity';
import { ReservationService } from 'src/domain/services/reservation/Reservation.service';
import { JwtAuthModule } from '../Jwt/Jwt.module';
import { UserModule } from '../User/User.module';
import { HotelRoomModule } from '../HotelRoom/HotelRoom.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Reservation]),
        JwtAuthModule,
        UserModule,
        HotelRoomModule
    ],
    providers: [ReservationService],
    controllers: [ReservationController],
    exports: [ReservationService],
})
export class ReservationModule { }
