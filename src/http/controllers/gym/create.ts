import {z} from 'zod';
import { FastifyRequest, FastifyReply } from 'fastify';
import { makeCreateGymUseCase } from '@/UseCases/factories/make-register-gym-use-case';
export async function register (request:FastifyRequest, reply:FastifyReply) {
    const registerBodySchema=z.object({
        name:z.string(),
        description:z.string().nullable(),
        phone:z.string().nullable(),
        avatarUrl:z.string().nullable(),
        latitude:z.number().refine((value)=>{
            return Math.abs(value)<=90;
        }),
        longitude:z.number().refine((value)=>{
            return Math.abs(value)<=180;
        })
    });


    const {name,description,phone,avatarUrl,latitude,longitude}=registerBodySchema.parse(request.body);

    const registerUseCase=makeCreateGymUseCase();
    await registerUseCase.execute(
        {
            name, 
            description, 
            phone,
            avatarUrl,
            latitude,
            longitude
        });
    
    return reply.status(201).send();
}
