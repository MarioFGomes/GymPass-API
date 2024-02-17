import '@fastify/jwt';

declare module '@fastify/jwt' {
    export interface FastifyJWT{
        user:
        {
            sub:string,
            role:'ADMIN' | 'MEMBER',
            name:string,
            avatarUrl:string | null
            
        }
    }
}