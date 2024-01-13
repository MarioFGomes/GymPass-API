import { InvalidCredentialsError } from '@/UseCases/errors/invalid-credentials-error';
import { FastifyRequest} from 'fastify';

export async function verifyJwt(request:FastifyRequest){
    
    try{
        await request.jwtVerify();

    }
    catch(error)
    {
        //return reply.status(401).send({message: 'Unauthorized'});
        throw new InvalidCredentialsError();
    }
}