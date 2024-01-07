import { Gym} from '@prisma/client';
import { GymRepository } from '@/repositories/gyms-repository';
import { ResourceNotFoundError } from '@/UseCases/errors/resource-not-found-error';

interface UploadAvatarCaseRequest{
    gym_id:        string,
    avatarUrl:     string,
}

interface UploadAvatarUseCaseResponse{
    gym:Gym
}
export class GymUploadAvatarUseCase{

    constructor(private gymRepository:GymRepository){}

    async execute({gym_id,avatarUrl}:UploadAvatarCaseRequest):Promise<UploadAvatarUseCaseResponse>{
        const gym=await this.gymRepository.findById(gym_id);

        if(!gym) throw new ResourceNotFoundError();

        gym.avatarUrl = avatarUrl;

        await this.gymRepository.save(gym_id,gym);

        return {
            gym
        };
    } 
}