import { Request } from 'express';
import { JwtAuthService } from 'src/domain/services/jwt/jwt.service';
import { extractJwtFromHeader } from '../jwt/jwt.utils';

export const extractAndVerifyToken = (req: Request, jwtAuthService: JwtAuthService) => {
    const token = extractJwtFromHeader(req.headers['authorization']);
    const decodedToken = jwtAuthService.verifyToken(token);

    return decodedToken;
};
