import { CheckInRepository } from '@/repositories/check-ins-repository';

interface GetUserMetricsCaseRequest{
userId: string

}

interface GetUserMetricsCaseResponse{
    CheckInsCounts:number
}

export class GetUserMetricsUseCase{
    constructor(
        private checkInRepository: CheckInRepository,
    ){}

    async execute({userId,}:GetUserMetricsCaseRequest): Promise<GetUserMetricsCaseResponse>{
        
        const CheckInsCounts=await this.checkInRepository.countByUserId(userId);


        return {CheckInsCounts};
    }
}