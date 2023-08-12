import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from 'src/domain/entities/reservation/reservation.entity';
import { ReservationRepository } from './Reservation.repository';

describe('ReservationRepository', () => {
    let reservationRepository: ReservationRepository;
    let mockReservationRepository: Repository<Reservation>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ReservationRepository,
                {
                    provide: getRepositoryToken(Reservation),
                    useClass: Repository,
                },
            ],
        }).compile();

        reservationRepository = module.get<ReservationRepository>(ReservationRepository);
        mockReservationRepository = module.get<Repository<Reservation>>(getRepositoryToken(Reservation));
    });

    describe('saveReservation', () => {
        it('should call save method with reservation', async () => {
            const reservation = new Reservation();

            const saveSpy = jest.spyOn(mockReservationRepository, 'save').mockResolvedValue(reservation);

            const result = await reservationRepository.saveReservation(reservation);

            expect(result).toEqual(reservation);
            expect(saveSpy).toHaveBeenCalledWith(reservation);
        });
    });
});
