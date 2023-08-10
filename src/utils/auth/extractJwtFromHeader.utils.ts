export const extractJwtFromHeader = (authorizationHeader: string): string | null => {
    if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
        return authorizationHeader.substring(7);
    }
    return null;
};