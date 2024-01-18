
import { FastifyRequest, FastifyReply } from 'fastify';
import { makeGetUserMetricsUseCase } from '@/UseCases/factories/make-get-user-metrics-use-case';


export async function metrics (request:FastifyRequest, reply:FastifyReply) {

    const getUserMetricsUseCase=makeGetUserMetricsUseCase();
    const {CheckInsCounts}=await getUserMetricsUseCase.execute(
        {
            userId: request.user.sub,
        });
    
    return reply.status(200).send({
        CheckInsCounts
    });
}