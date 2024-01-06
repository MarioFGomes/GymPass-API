import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository';
import { GetUserMetricsUseCase } from '../CheckIns/GetMetrics/get-user-metrics';


export function makeGetUserMetricsUseCase(){
    const prismaCheckInsRepository=new PrismaCheckInsRepository();
    const getUserMetricsUseCase=new GetUserMetricsUseCase(prismaCheckInsRepository);

    return getUserMetricsUseCase;
}