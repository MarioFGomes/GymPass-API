import { UsersRepository } from '@/repositories/users-repository';
import { User } from '@prisma/client';
import { ResourceNotFoundError } from '@/UseCases/errors/resource-not-found-error';

interface UploadAvatarUseCaseRequest{
    user_id: string,
    avatarUrl:   string
}

interface UploadAvatarUseCaseResponse{
    user:User
}
export class UserUploadAvatarUseCase{

    constructor(private usersRepository:UsersRepository){}

    async execute({user_id,avatarUrl}:UploadAvatarUseCaseRequest):Promise<UploadAvatarUseCaseResponse>{

        const user=await this.usersRepository.findById(user_id);
        
        if(!user) throw new ResourceNotFoundError();
        user.avatarUrl = avatarUrl;
        await this.usersRepository.save(user_id,user);

        return {
            user
        };
    } 
}