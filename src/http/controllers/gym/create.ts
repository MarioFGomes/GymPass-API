import {z} from 'zod';
import { FastifyRequest, FastifyReply } from 'fastify';
import { makeCreateGymUseCase } from '@/UseCases/factories/make-register-gym-use-case';
export async function create (request:FastifyRequest, reply:FastifyReply) {
    const createBodySchema=z.object({
        name:z.string(),
        description:z.string().nullable(),
        phone:z.string().nullable(),
        latitude:z.number().refine((value)=>{
            return Math.abs(value)<=90;
        }),
        longitude:z.number().refine((value)=>{
            return Math.abs(value)<=180;
        })
    });


    const {name,description,phone,latitude,longitude}=createBodySchema.parse(request.body);

    const createUseCase=makeCreateGymUseCase();
    await createUseCase.execute(
        {
            name, 
            description, 
            phone,
            latitude,
            longitude
        });
    
    return reply.status(201).send();
}
