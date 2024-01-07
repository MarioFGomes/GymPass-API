import { Gym} from '@prisma/client';
import { GymRepository } from '@/repositories/gyms-repository';

interface CreateGymUseCaseRequest{
    name:        string,
    description: string,
    phone:       string,
    avatarUrl?:  string,
    latitude:    number,
    longitude:   number
}

interface CreateGymResponseUseCase{
    gym:Gym
}
export class CreateGymUseCase{

    constructor(private gymRepository:GymRepository){}

    async execute({name, description, phone,avatarUrl,latitude,longitude}:CreateGymUseCaseRequest):Promise<CreateGymResponseUseCase>{

        const gym=await this.gymRepository.create({
            name, 
            description, 
            phone,
            avatarUrl,
            latitude,
            longitude
        });

        return {
            gym
        };
    } 
}