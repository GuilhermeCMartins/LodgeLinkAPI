import { Body, Controller, Get, Post, Req, HttpCode, HttpStatus, Query, BadGatewayException } from '@nestjs/common';
import { ReservationService } from 'src/domain/services/reservation/Reservation.service';
import { JwtAuthService } from 'src/domain/services/jwt/jwt.service';
import { UserService } from 'src/domain/services/user/user.service';
import { HotelRoomService } from 'src/domain/services/room/HotelRoom.service';
import { SimpleReservation } from 'src/utils/interfaces/SimpleReservation.interface';
import { BadRequestException } from 'src/domain/exceptions/BadRequest/BadRequestException';
import { extractAndVerifyToken } from 'src/utils/auth/auth.utils';
import { NotFoundException } from 'src/domain/exceptions/NotFound/NotFoundException';
import { UnauthorizedException } from 'src/domain/exceptions/Unauthorized/UnauthorizedException';
import { createReservationSchema } from 'src/utils/validations/reservation.validation';
import NewReservation from 'src/utils/interfaces/NewReservation.interface';



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
    async createReservation(@Body() reservationPayload: any, @Req() req): Promise<NewReservation> {

        try {
            const decodedToken = extractAndVerifyToken(req, this.jwtAuthService);

            if (!decodedToken) {
                throw new UnauthorizedException('Invalid or expired token.');
            }

            const { roomId, checkIn, checkOut } = reservationPayload;
            const userId = decodedToken.id;

            const room = await this.hotelRoomService.findById(roomId);
            const user = await this.userService.findUserById(userId);

            const newReservation = {
                checkIn,
                checkOut,
                room,
                user
            }

            const { error } = createReservationSchema.validate(newReservation)

            if (error) {
                throw new BadGatewayException(error.message)
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

        const user = await this.userService.findUserById(userId);

        if (!user) {
            throw new NotFoundException('User not found')
        }

        const reservations = await this.reservationService.getReservationsByUser(user);

        if (!reservations) {
            throw new NotFoundException('Not found any reservations for this userId')
        }

        return reservations
    }

}

