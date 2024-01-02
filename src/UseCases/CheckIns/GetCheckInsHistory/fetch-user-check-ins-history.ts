import { CheckInRepository } from '@/repositories/check-ins-repository';
import { CheckIn,  } from '@prisma/client';

interface FetchUserCheckInsHistoryCaseRequest{
userId: string,
page: number
}

interface FetchUserCheckInsHistoryCaseResponse{
    CheckIns:CheckIn[]
}

export class FetchUserCheckInsHistoryUseCase{
    constructor(
        private checkInRepository: CheckInRepository,
    ){}

    async execute({userId,page}:FetchUserCheckInsHistoryCaseRequest): Promise<FetchUserCheckInsHistoryCaseResponse>{
        
        const CheckIns=await this.checkInRepository.findManyByUserId(userId,page);


        return {CheckIns};
    }
}