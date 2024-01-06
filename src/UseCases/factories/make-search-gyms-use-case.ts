import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository';
import { SearchGymUseCase } from '../Gym/SearchMany/search-gyms';


export function makeSearchGymUseCase(){
    const prismaGymsRepository=new PrismaGymsRepository();
    const searchGymUseCase=new SearchGymUseCase(prismaGymsRepository);

    return searchGymUseCase;
}