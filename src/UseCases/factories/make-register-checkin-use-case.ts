import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository';
import { CheckInUseCase } from '../CheckIns/register/check-in';
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository';


export function makeCheckInUseCaseUseCase(){
    const prismaCheckInsRepository=new PrismaCheckInsRepository();
    const prismaGymsRepository=new PrismaGymsRepository();
    const checkInUseCase=new CheckInUseCase(prismaCheckInsRepository,prismaGymsRepository);

    return checkInUseCase;
}