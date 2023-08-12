import { UserRole } from 'src/domain/enums/user-role.enum';


export const createMockHotelRoom = {
    id: 1,
    name: 'Quarto Deluxe',
    description: 'Quarto de luxo com vista para o mar',
    pricePerNight: 250,
    capacity: 2,
    isAvailable: true,
    onPromotion: null,
    imageURL: 'https://example.com/image.jpg',
    reservations: [],
};

export const createMockUser = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'user@example.com',
    password: 'password123',
    role: UserRole.CLIENT,
    cpf: '12345678900',
    reservations: [],
};

export const createMockReservation = {
    id: 1,
    user: createMockUser,
    room: createMockHotelRoom,
    checkIn: new Date('2023-09-16T10:00:00'),
    checkOut: new Date('2023-09-17T10:00:00'),
};
