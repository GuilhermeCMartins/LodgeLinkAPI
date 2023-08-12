import { Reservation } from './reservation.entity';
import { User } from '../user/user.entity';
import { HotelRoom } from '../room/HotelRoom.entity';

describe('Reservation Entity', () => {
    it('should create a reservation entity with user and room', () => {
        const user = new User();
        user.id = 1;

        const room = new HotelRoom();
        room.id = 2;

        const reservation = new Reservation();
        reservation.id = 3;
        reservation.user = user;
        reservation.room = room;
        reservation.checkIn = new Date('2023-09-16T10:00:00');
        reservation.checkOut = new Date('2023-09-17T10:00:00');

        expect(reservation.id).toBe(3);
        expect(reservation.user).toBe(user);
        expect(reservation.room).toBe(room);
        expect(reservation.checkIn).toEqual(new Date('2023-09-16T10:00:00'));
        expect(reservation.checkOut).toEqual(new Date('2023-09-17T10:00:00'));
    });
});
