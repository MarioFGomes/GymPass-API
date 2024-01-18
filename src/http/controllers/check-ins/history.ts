import {z} from 'zod';
import { FastifyRequest, FastifyReply } from 'fastify';
import { makeFetchUserCheckInsHistoryUseCase } from '@/UseCases/factories/make-fetch-user-check-ins-history-use-case';


export async function history (request:FastifyRequest, reply:FastifyReply) {
    const CheckInsHistoryQuerySchema=z.object({
        page:z.coerce.number().min(1).default(1),
    });

    const {page}=CheckInsHistoryQuerySchema.parse(request.query);

    const fetchUserCheckInsHistoryUseCase=makeFetchUserCheckInsHistoryUseCase();
    const {CheckIns}=await fetchUserCheckInsHistoryUseCase.execute(
        {
            userId: request.user.sub,
            page
        });
    
    return reply.status(200).send({
        CheckIns
    });
}