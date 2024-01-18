import {z} from 'zod';
import { FastifyRequest, FastifyReply } from 'fastify';
import { makeCheckInUseCaseUseCase } from '@/UseCases/factories/make-register-checkin-use-case';
export async function create (request:FastifyRequest, reply:FastifyReply) {

    const createCheckInsParamsSchema= z.object({
        gymId:z.string().uuid()
    });

    const createCheckInsBodySchema=z.object({
        latitude:z.number().refine((value)=>{
            return Math.abs(value)<=90;
        }),
        longitude:z.number().refine((value)=>{
            return Math.abs(value)<=180;
        })
    });

    const {gymId}=createCheckInsParamsSchema.parse(request.params);

    const {latitude,longitude}=createCheckInsBodySchema.parse(request.body);

    const createCheckInUseCase=makeCheckInUseCaseUseCase();
    await createCheckInUseCase.execute(
        {
            gymId,
            userId:request.user.sub,
            userLatitude:latitude,
            userLongitude:longitude
        });
    
    return reply.status(201).send();
}