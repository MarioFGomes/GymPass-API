import { UsersRepository } from '@/repositories/users-repository';
import { User } from '@prisma/client';
import { ResourceNotFoundError } from '@/UseCases/errors/resource-not-found-error';
import { getRedis } from '@/config/RedisConfig';

interface GetUserProfileUseCaseRequest{
  user_id: string;
}

interface GetUserProfileUseCaseResponse{
    user:User
}

export class GetUserProfileUseCase{
    constructor(private usersRepository: UsersRepository){}

    async execute({user_id}:GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse>{
        
        const userRedis=await getRedis(`user-${user_id}`);
        if(userRedis){
            return JSON.parse(userRedis);
        }

        const user= await this.usersRepository.findById(user_id);
        if(!user) throw new ResourceNotFoundError();

        return {user};
    }
}