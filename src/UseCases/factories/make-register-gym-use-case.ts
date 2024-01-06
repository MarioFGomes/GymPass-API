import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository';
import { CreateGymUseCase } from '../Gym/register/create-gym';


export function makeCreateGymUseCase(){
    const prismaGymsRepository=new PrismaGymsRepository();
    const createGymUseCase=new CreateGymUseCase(prismaGymsRepository);

    return createGymUseCase;
}