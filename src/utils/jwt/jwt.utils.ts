export function extractJwtFromHeader(authorizationHeader: string): string {
    const [bearer, token] = authorizationHeader.split(' ');
    if (bearer === 'Bearer' && token) {
        return token;
    }
    return null;
}