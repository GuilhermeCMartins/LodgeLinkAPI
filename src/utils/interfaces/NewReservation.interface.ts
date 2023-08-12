export default interface NewReservation {
    checkIn: Date,
    checkOut: Date,
    user: {
        id: number,
        firstName: string,
        lastName: string,
        email: string,
    },
    room: {
        id: number,
        name: string,
    },
    id: number
};