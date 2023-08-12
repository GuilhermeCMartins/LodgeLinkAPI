import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HotelRoomRepository } from './HotelRoom.repository';
import { Repository } from 'typeorm';
import { HotelRoom } from '../../entities/room/HotelRoom.entity';

describe('HotelRoomRepository', () => {
    let hotelRoomRepository: HotelRoomRepository;
    let mockHotelRoomRepository: Partial<Record<keyof Repository<HotelRoom>, jest.Mock>>;
    let hotelRoomRepositoryToken: string | Function;

    beforeEach(async () => {
        hotelRoomRepositoryToken = getRepositoryToken(HotelRoom);

        mockHotelRoomRepository = {
            save: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                HotelRoomRepository,
                {
                    provide: hotelRoomRepositoryToken,
                    useValue: mockHotelRoomRepository,
                },
            ],
        }).compile();

        hotelRoomRepository = module.get<HotelRoomRepository>(HotelRoomRepository);
    });

    it('should be defined', () => {
        expect(hotelRoomRepository).toBeDefined();
    });

});
