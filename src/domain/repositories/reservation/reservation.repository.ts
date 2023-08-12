import { Repository } from 'typeorm';
import { Reservation } from 'src/domain/entities/reservation/reservation.entity';
import { InjectRepository } from '@nestjs/typeorm';


export class ReservationRepository extends Repository<Reservation> {
    constructor(
        @InjectRepository(Reservation)
        private reservationRepository: Repository<Reservation>
    ) {
        super(reservationRepository.target, reservationRepository.manager, reservationRepository.queryRunner)
    }

}
