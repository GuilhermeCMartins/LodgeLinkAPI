import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { HotelRoomModule } from './domain/modules/HotelRoom/HotelRoom.module';
import { AuthModule } from './domain/modules/Auth/Auth.module';
import { UserModule } from './domain/modules/User/User.module';
import { ReservationModule } from './domain/modules/Reservation/Reservation.module';
import { JwtAuthModule } from './domain/modules/Jwt/Jwt.module';
import { dataSourceOptions } from '../db/data-source';

@Module({
  imports: [
    HotelRoomModule,
    AuthModule,
    UserModule,
    ReservationModule,
    JwtAuthModule,
    TypeOrmModule.forRoot(dataSourceOptions)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
