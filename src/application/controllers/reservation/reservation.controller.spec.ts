import { UnauthorizedException } from "src/domain/exceptions/Unauthorized/UnauthorizedException";
import { ReservationController } from "./reservation.controller";
import { JwtAuthService } from "src/domain/services/jwt/jwt.service";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/domain/services/user/user.service";
import { UserRepository } from "src/domain/repositories/user/user.repository";
import { Repository } from "typeorm";
import { User } from "src/domain/entities/user/user.entity";
import { HotelRoomService } from "src/domain/services/room/HotelRoom.service";
import { HotelRoomRepository } from "src/domain/repositories/room/HotelRoom.repository";
import { HotelRoom } from "src/domain/entities/room/HotelRoom.entity";
import { ReservationRepository } from "src/domain/repositories/reservation/Reservation.repository";
import { Reservation } from "src/domain/entities/reservation/reservation.entity";
import { ReservationService } from "src/domain/services/reservation/Reservation.service";
import { ConflictException } from "src/domain/exceptions/Conflict/ConflictException";
import { NotFoundException } from "src/domain/exceptions/NotFound/NotFoundException";
import { UserRole } from "src/domain/enums/user-role.enum";



describe('ReservationController', () => {
    let reservationController: ReservationController;
    let reservationServiceMock: ReservationService;
    let userService: UserService;
    let hotelRoomService: HotelRoomService;
    let jwtAuthService: JwtAuthService;
    let user: User;
    let room: HotelRoom
    let reservationPayload: any;
    let newReservation: any;

    beforeEach(() => {
        user = { id: 1, email: 'existingEmail', firstName: 'teste', cpf: 'teste', lastName: 'teste', password: 'teste', reservations: [], role: UserRole.CLIENT };

        reservationPayload = {
            roomId: 1,
            checkIn: new Date('2022-01-01'),
            checkOut: new Date('2022-01-03')
        }
        room = {
            id: 1,
            name: 'Quarto Deluxe',
            description: 'Quarto de luxo com vista para o mar',
            pricePerNight: 250,
            capacity: 2,
            isAvailable: true,
            onPromotion: null,
            imageURL: 'https://example.com/image.jpg',
            reservations: [],
        }
        newReservation = {
            checkIn: reservationPayload.checkIn,
            checkOut: reservationPayload.checkOut,
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            },
            room: room,
            id: 1
        }
        const userRepositoryMock: Partial<Repository<User>> = {
            findOne: jest.fn(),
        };

        userService = new UserService(userRepositoryMock as UserRepository);

        const reservationRepositoryMock: Partial<Repository<Reservation>> = {
            save: jest.fn(),
            find: jest.fn(),
            create: jest.fn()
        };
        reservationServiceMock = new ReservationService(reservationRepositoryMock as ReservationRepository)

        jwtAuthService = new JwtAuthService(new JwtService());
        jwtAuthService.verifyToken = jest.fn().mockReturnValue({ id: user.id })

        const hotelRoomRepositoryMock: Partial<Repository<HotelRoom>> = {
            findOne: jest.fn(),
        };
        hotelRoomService = new HotelRoomService(hotelRoomRepositoryMock as HotelRoomRepository, reservationRepositoryMock as ReservationRepository);

        reservationController = new ReservationController(reservationServiceMock, jwtAuthService, userService, hotelRoomService)
    })

    it('should create a reservation successfully when valid payload and token are provided', async () => {
        reservationServiceMock.isRoomAllocated = jest.fn().mockReturnValue(false);
        reservationServiceMock.createReservation = jest.fn().mockResolvedValue(newReservation);

        jwtAuthService.verifyToken = jest.fn().mockReturnValue({ id: user.id })

        userService.findUserById = jest.fn().mockResolvedValue(user)

        hotelRoomService.findById = jest.fn().mockResolvedValue(room)

        const req = {
            headers: {
                authorization: 'Bearer valid-token'
            }
        }
        const result = await reservationController.createReservation(reservationPayload, req)

        expect(result).toEqual(newReservation);
    });

    it('should throw an UnauthorizedException when the token is invalid or expired', async () => {
        const reservationPayload = {
            roomId: 1,
            checkIn: new Date(),
            checkOut: new Date(),
        };
    
        jest.spyOn(jwtAuthService, 'verifyToken').mockReturnValueOnce(null); 
        const req = { headers: { authorization: 'Bearer invalid_token' } };
    
        await expect(reservationController.createReservation(reservationPayload, req)).rejects.toThrow(UnauthorizedException);
    });
    

    it('should throw an error when reservation payload is invalid', async () => {
        reservationPayload = {
            roomId: 1,
            checkIn: 'invalid-date',
            checkOut: new Date('2022-01-03')
        };

        jwtAuthService.verifyToken = jest.fn().mockReturnValue({ id: 1 });

        const req = {
            headers: {
                authorization: 'Bearer valid-token'
            }
        };

        try {
            await reservationController.createReservation(reservationPayload, req);
        } catch (error) {
            expect(error).toBeInstanceOf(ConflictException);
        }
    });

    it('should throw an error when room is already allocated for the specified dates', async () => {
        room = { ...room, isAvailable: false }

        jwtAuthService.verifyToken = jest.fn().mockReturnValue({ id: user.id })

        const isRoomAllocatedSpy = jest.spyOn(reservationServiceMock, 'isRoomAllocated').mockResolvedValueOnce(true)

        userService.findUserById = jest.fn().mockResolvedValue(user)

        hotelRoomService.findById = jest.fn().mockResolvedValue(room)

        await expect(reservationController.createReservation(reservationPayload, { headers: { authorization: 'Bearer valid_token' } })).rejects.toThrow(ConflictException)
        expect(isRoomAllocatedSpy).toHaveBeenCalledWith(room, reservationPayload.checkIn, reservationPayload.checkOut)
    });

    it('should throw an error when user is not found', async () => {
        const findUserByIdSpy = jest.spyOn(userService, 'findUserById').mockResolvedValueOnce(null)

        jwtAuthService.verifyToken = jest.fn().mockReturnValue({ id: user.id })

        await expect(reservationController.getUserReservations(user.id)).rejects.toThrow(NotFoundException)
        expect(findUserByIdSpy).toHaveBeenCalledWith(user.id)
    });

    it('should throw an error when user email already exists', async () => {
        const findUserByIdSpy = jest.spyOn(userService, 'findUserById').mockResolvedValueOnce(user);
        await expect(reservationController.createReservation(reservationPayload, { headers: { authorization: 'Bearer token' } })).rejects.toThrow(ConflictException);
        expect(findUserByIdSpy).toHaveBeenCalledWith(1);
    });

    it('should return an array of SimpleReservation objects when a valid userId is provided and there are reservations associated with that user', async () => {
        const userId = 1;
        user = { id: 1, email: 'existingEmail', firstName: 'teste', cpf: 'teste', lastName: 'teste', password: 'teste', reservations: [], role: UserRole.CLIENT };
        const reservations = [{ id: 1, checkIn: new Date(), checkOut: new Date(), roomId: 1, roomName: 'Room 1', userId: 1, username: 'user1' }];

        jest.spyOn(userService, 'findUserById').mockResolvedValueOnce(user);
        jest.spyOn(reservationServiceMock, 'getReservationsByUser').mockResolvedValueOnce(reservations);
        const result = await reservationController.getUserReservations(userId);
        expect(result).toEqual(reservations);
    });

    it('should return an empty array when a valid userId is provided but there are no reservations associated with that user', async () => {
        const userId = 1;
        const user: User = { id: 1, email: 'existingEmail', firstName: 'teste', cpf: 'teste', lastName: 'teste', password: 'teste', reservations: [], role: UserRole.CLIENT };
        const reservations = [];

        jest.spyOn(userService, 'findUserById').mockResolvedValueOnce(user);
        jest.spyOn(reservationServiceMock, 'getReservationsByUser').mockResolvedValueOnce(reservations);
        const result = await reservationController.getUserReservations(userId);
        expect(result).toEqual(reservations);
    });

    it('should throw a NotFoundException when userId is not provided', async () => {
        const userId = undefined;

        const reservationController = new ReservationController(reservationServiceMock, jwtAuthService, userService, hotelRoomService)
        await expect(reservationController.getUserReservations(userId)).rejects.toThrow(NotFoundException);
    });

    it('should throw a NotFoundException when userId is provided but there is no user associated with that id', async () => {
        const userId = 1;
        jest.spyOn(userService, 'findUserById').mockResolvedValueOnce(undefined);
        await expect(reservationController.getUserReservations(userId)).rejects.toThrow(NotFoundException);
    });

    it('should return an array of SimpleReservation objects with correct properties when a valid userId is provided and there are reservations associated with that user', async () => {
        const userId = 1;
        const reservations = [{ id: 1, checkIn: new Date(), checkOut: new Date(), roomId: 1, roomName: 'Room 1', userId: 1, username: 'user1' }];
        jest.spyOn(userService, 'findUserById').mockResolvedValueOnce(user);
        jest.spyOn(reservationServiceMock, 'getReservationsByUser').mockResolvedValueOnce(reservations);
        const result = await reservationController.getUserReservations(userId);
        expect(result[0]).toHaveProperty('id');
        expect(result[0]).toHaveProperty('checkIn');
        expect(result[0]).toHaveProperty('checkOut');
        expect(result[0]).toHaveProperty('roomId');
        expect(result[0]).toHaveProperty('roomName');
        expect(result[0]).toHaveProperty('userId');
        expect(result[0]).toHaveProperty('username');
    });

    it('should throw a NotFoundException when userId is provided but there are no reservations associated with that user', async () => {
        const userId = 1;
        const reservations = undefined;
        jest.spyOn(userService, 'findUserById').mockResolvedValueOnce(user);
        jest.spyOn(reservationServiceMock, 'getReservationsByUser').mockResolvedValueOnce(reservations);
        await expect(reservationController.getUserReservations(userId)).rejects.toThrow(NotFoundException);
    });
});
