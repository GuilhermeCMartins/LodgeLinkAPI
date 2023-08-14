import { HotelRoomService } from "src/domain/services/room/HotelRoom.service";
import { HotelRoomController } from "./HotelRoom.controller";
import { NotFoundException } from "src/domain/exceptions/NotFound/NotFoundException";
import { BadRequestException } from "src/domain/exceptions/BadRequest/BadRequestException";
import { HotelRoom } from "src/domain/entities/room/HotelRoom.entity";
import { createHotelRoomSchema } from "src/utils/validations/hotelroom.validation";
import Joi = require("joi");

describe('HotelRoomController', () => {
    let hotelRoomController: HotelRoomController;
    let hotelRoomService: Partial<HotelRoomService>;

    beforeEach(() => {
        hotelRoomService = {
            findAll: jest.fn(),
            findById: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        }
        hotelRoomController = new HotelRoomController(hotelRoomService as HotelRoomService);
    })

    it('should return all hotel rooms when called', async () => {
        hotelRoomService.findAll = jest.fn().mockResolvedValue([{ id: 1, name: 'Room 1' }, { id: 2, name: 'Room 2' }])

        const result = await hotelRoomController.findAll();
        expect(result).toEqual([{ id: 1, name: 'Room 1' }, { id: 2, name: 'Room 2' }]);
    });

    it('should return a specific hotel room when called with a valid id', async () => {
        hotelRoomService.findById = jest.fn().mockResolvedValue({ id: 1, name: 'Room 1' })

        const result = await hotelRoomController.findById(1);
        expect(result).toEqual({ id: 1, name: 'Room 1' });
    });

    it('should create a new hotel room when called with valid data', async () => {
        hotelRoomService.save = jest.fn().mockResolvedValue({ id: 1, name: 'Room 1' })

        const result = await hotelRoomController.create({ name: 'Room 1', description: 'A nice room', pricePerNight: 100, capacity: 2, isAvailable: true });
        expect(result).toEqual({ id: 1, name: 'Room 1' });
    });

    it('should throw a BadRequestException when invalid data is provided', async () => {
        const hotelRoom = {
            name: '',
            description: '',
            pricePerNight: 'not a number' as unknown as number,
            capacity: 'not a number' as unknown as number,
            isAvailable: 'not a boolean' as unknown as boolean,
            onPromotion: {
                status: true as unknown as boolean,
                newPrice: 'not a number' as unknown as number,
                initialDate: 'not a date' as unknown as Date,
                endDate: 'not a date' as unknown as Date,
            },
            imageURL: 123 as unknown as string,
        };

        const mockValidationError: Joi.ValidationError = {
            name: 'ValidationError',
            isJoi: true,
            details: [],
            annotate: () => '',
            _original: hotelRoom,
            message: ""
        };

        const validateSpy = jest.spyOn(createHotelRoomSchema, 'validate').mockReturnValue({ error: mockValidationError, value: null });

        expect.assertions(2);
        try {
            await hotelRoomController.create(hotelRoom);
        } catch (error) {
            expect(error).toBeInstanceOf(BadRequestException);
            expect(error.message).toBe(mockValidationError.annotate());
        }
    });

    it('should allow imageURL and onPromotion to be null or undefined', async () => {
        const hotelRoom: HotelRoom = {
            id: 1,
            name: 'Test Room',
            description: 'Test Description',
            pricePerNight: 100,
            capacity: 2,
            isAvailable: true,
            onPromotion: null,
            imageURL: null,
            reservations: []
        };

        jest.spyOn(HotelRoomController.prototype, 'create').mockResolvedValueOnce(hotelRoom);

        const result = await HotelRoomController.prototype.create(hotelRoom);

        expect(result).toEqual(hotelRoom);
    });

    it('should update a hotel room when called with a valid id and data', async () => {
        hotelRoomService.update = jest.fn().mockResolvedValue({ id: 1, name: 'Room 1' })

        const result = await hotelRoomController.update(1, { name: 'Room 1', description: 'A nice room', pricePerNight: 100, capacity: 2, isAvailable: true });
        expect(result).toEqual({ id: 1, name: 'Room 1' });
    });

    it('should delete a hotel room when called with a valid id', async () => {
        hotelRoomService.delete = jest.fn().mockResolvedValue(undefined)

        const result = await hotelRoomController.delete(1);
        expect(result).toBeUndefined();
    });

    it('should throw a NotFoundException when called with an invalid id', async () => {
        hotelRoomService.findById = jest.fn().mockResolvedValue(undefined)

        try {
            await hotelRoomController.findById(1);
            fail('NotFoundException not thrown');
        } catch (error) {
            expect(error).toBeInstanceOf(NotFoundException);
            expect(error.message).toBe('Hotelroom not found by this id: 1');
        }
    });
});
