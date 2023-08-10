import { Body, Controller, Get, Post, Req, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { Reservation } from 'src/domain/entities/reservation/reservation.entity';
import { ReservationService } from 'src/domain/services/reservation/Reservation.service';
import { JwtAuthService } from 'src/domain/services/jwt/jwt.service';
import { UserService } from 'src/domain/services/user/user.service';
import { HotelRoomService } from 'src/domain/services/room/HotelRoom.service';
import { SimpleReservation } from 'src/utils/interfaces/SimpleReservation.interface';
import { BadRequestException } from 'src/domain/exceptions/BadRequestException';
import { extractAndVerifyToken } from 'src/utils/auth/auth.utils';
import { NotFoundException } from 'src/domain/exceptions/NotFoundException';
import { UnauthorizedException } from 'src/domain/exceptions/UnauthorizedException';



@Controller('reservations')
export class ReservationController {
    constructor(
        private readonly reservationService: ReservationService,
        private readonly jwtAuthService: JwtAuthService,
        private readonly userService: UserService,
        private readonly hotelRoomService: HotelRoomService,
    ) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createReservation(@Body() reservationPayload: any, @Req() req): Promise<Reservation> {

        try {
            const decodedToken = extractAndVerifyToken(req, this.jwtAuthService);
            if (!decodedToken) {
                throw new UnauthorizedException('Invalid or expired token.');
            }

            const { roomId, checkIn, checkOut } = reservationPayload;
            const userId = decodedToken.id;

            const room = await this.hotelRoomService.findById(roomId);
            if (!room) {
                throw new BadRequestException('Invalid HotelRoom');
            }

            const user = await this.userService.findUserById(userId);
            if (!user) {
                throw new BadRequestException('Invalid User');
            }

            if (!checkIn || !checkOut) {
                throw new BadRequestException('Invalid checkin or checkout dates.')
            }

            const reservation = await this.reservationService.createReservation(user, room, { checkIn, checkOut });
            return reservation;
        } catch (error) {
            throw error;
        }

    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async getUserReservations(@Query('userId') userId: number): Promise<SimpleReservation[]> {
        if (!userId) {
            throw new NotFoundException('User ID not provided.');
        }

        return await this.reservationService.getReservationsByUser(userId);
    }

}

