import { Gym} from '@prisma/client';
import { GymRepository } from '@/repositories/gyms-repository';

interface FindManyNearbyGymUseCaseRequest{
  UserLatitude:        number,
  UserLongitude:         number
}

interface FindManyNearbyGymResponseUseCase{
    gyms:Gym[]
}
export class FindManyNearbyGymUseCase{

    constructor(private gymRepository:GymRepository){}

    async execute({UserLatitude, UserLongitude}:FindManyNearbyGymUseCaseRequest):Promise<FindManyNearbyGymResponseUseCase>{

        const gyms=await this.gymRepository.FindManyNearBy({latitude:UserLatitude,longitude:UserLongitude});

        return {
            gyms 
        };
    } 
}