import { HotelRoom } from './HotelRoom.entity';


describe('HotelRoom Entity', () => {
    it('should create a reservation entity', () => {
        const hotelRoom = new HotelRoom();
        hotelRoom.id = 1;
        hotelRoom.description = 'teste';
        hotelRoom.capacity = 20;
        hotelRoom.imageURL = 'teste';
        hotelRoom.isAvailable = true;
        hotelRoom.name = 'teste';
        hotelRoom.onPromotion = null;
        hotelRoom.pricePerNight = 200;
        hotelRoom.reservations = [];




        expect(hotelRoom).toBeDefined();
        expect(hotelRoom.id).toEqual(1);
        expect(hotelRoom.description).toEqual('teste');
        expect(hotelRoom.capacity).toEqual(20);
        expect(hotelRoom.imageURL).toEqual('teste');
        expect(hotelRoom.isAvailable).toEqual(true);
        expect(hotelRoom.name).toEqual('teste');
        expect(hotelRoom.onPromotion).toEqual(null);
        expect(hotelRoom.reservations).toEqual([]);
        expect(hotelRoom.pricePerNight).toEqual(200);

    });
});
