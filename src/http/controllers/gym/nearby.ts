import {z} from 'zod';
import { FastifyRequest, FastifyReply } from 'fastify';
import { makeFindManyNearbyGymUseCase } from '@/UseCases/factories/make-fetch-nearby-gyms-use-cse';

export async function nearby (request:FastifyRequest, reply:FastifyReply) {
    const nearbyGymsQuerySchema=z.object({

        latitude:z.coerce.number().refine((value)=>{
            return Math.abs(value)<=90;
        }),
        longitude:z.coerce.number().refine((value)=>{
            return Math.abs(value)<=180;
        })
    });

    const {latitude, longitude}=nearbyGymsQuerySchema.parse(request.query);

    const nearbyUseCase=makeFindManyNearbyGymUseCase();
    const {gyms}=await nearbyUseCase.execute(
        {
            UserLatitude:latitude,
            UserLongitude: longitude
        });
    
    return reply.status(200).send({
        gyms
    });
}