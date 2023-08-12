import { createMockUser } from 'src/utils/test/mockData';
import { User } from './user.entity';
import { UserRole } from 'src/domain/enums/user-role.enum';

describe('User Entity', () => {
    it('should create a reservation entity', () => {
        const user = new User();
        user.id = 1;
        user.firstName = 'John';
        user.lastName = 'Doe';
        user.email = 'user@example.com';
        user.password = 'password123';
        user.role = UserRole.CLIENT;
        user.cpf = '12345678900';
        user.reservations = [];


        expect(user).toBeDefined();
        expect(user).toEqual(createMockUser)

    });
});
