import {z} from 'zod';
import { FastifyRequest, FastifyReply } from 'fastify';
import { InvalidCredentialsError } from '@/UseCases/errors/invalid-credentials-error';
import { makeAuthenticateUseCase } from '@/UseCases/factories/make-authenticate-use-case';
export async function authenticate (request:FastifyRequest, reply:FastifyReply) {
    const AuthenticateBodySchema=z.object({
        email:z.string().email(),
        password:z.string().min(6)
    });


    const {email,password}=AuthenticateBodySchema.parse(request.body);

    try{

        const authenticateUseCase=makeAuthenticateUseCase();
        await authenticateUseCase.execute({email,password});

    }catch(err){
        if(err instanceof InvalidCredentialsError){
            return reply.status(400).send({message:err.message});
        }
        throw err;
        
    }

    return reply.status(200).send();
}