import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository';
import { FindManyNearbyGymUseCase } from '../Gym/FindManyNearby/fetch-nearby-gyms';


export function makeFindManyNearbyGymUseCase(){
    const prismaGymsRepository=new PrismaGymsRepository();
    const findManyNearbyGymUseCase=new FindManyNearbyGymUseCase(prismaGymsRepository);

    return findManyNearbyGymUseCase;
}