import {z} from 'zod';
import { FastifyRequest, FastifyReply } from 'fastify';
import { makeSearchGymUseCase } from '@/UseCases/factories/make-search-gyms-use-case';
export async function search (request:FastifyRequest, reply:FastifyReply) {
    const searchGymsQuerySchema=z.object({
        query:z.string(),
        page:z.coerce.number().min(1).default(1),
    });

    const {query, page}=searchGymsQuerySchema.parse(request.query);

    const SearchUseCase=makeSearchGymUseCase();
    const {gyms}=await SearchUseCase.execute(
        {
            query,
            page
        });
    
    return reply.status(200).send({
        gyms
    });
}