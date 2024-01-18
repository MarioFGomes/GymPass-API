import { makeUserProfileUseCase } from '@/UseCases/factories/make-user-profile-use-case';
import { FastifyRequest, FastifyReply } from 'fastify';

export async function profile (request:FastifyRequest, reply:FastifyReply) {
  
    const getUserProfile=makeUserProfileUseCase();

    const {user}=await getUserProfile.execute({user_id:request.user.sub});
   
    return reply.status(200).send({
        user:{
            ...user,
            password_hash:undefined
        }
    });
}