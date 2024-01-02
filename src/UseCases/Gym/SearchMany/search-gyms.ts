import { Gym} from '@prisma/client';
import { GymRepository } from '@/repositories/gyms-repository';

interface SearchGymUseCaseRequest{
    query:        string,
    page:         number
}

interface SearchGymResponseUseCase{
    gyms:Gym[]
}
export class SearchGymUseCase{

    constructor(private gymRepository:GymRepository){}

    async execute({query, page}:SearchGymUseCaseRequest):Promise<SearchGymResponseUseCase>{

        const gyms=await this.gymRepository.SearchMany(query, page);

        return {
            gyms 
        };
    } 
}