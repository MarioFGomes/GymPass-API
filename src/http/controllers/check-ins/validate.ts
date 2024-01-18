import {z} from 'zod';
import { FastifyRequest, FastifyReply } from 'fastify';
import { makeValidateCheckInUseCase } from '@/UseCases/factories/make-validate-checck-ins-use-case';


export async function validate (request:FastifyRequest, reply:FastifyReply) {

    const validateCheckInsParamsSchema= z.object({
        CheckInId:z.string().uuid()
    });

    const { CheckInId }=validateCheckInsParamsSchema.parse(request.params);


    const validateCheckInUseCase=makeValidateCheckInUseCase();
    await validateCheckInUseCase.execute(
        {
            CheckInId
        });
    
    return reply.status(204).send();
}