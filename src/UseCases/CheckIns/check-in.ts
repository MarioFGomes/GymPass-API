import { CheckInRepository } from '@/repositories/check-ins-repository';
import { CheckIn,  } from '@prisma/client';

interface CheckinUseCaseRequest{
  userId: string,
  gymId:string,
}

interface CheckinUseCaseResponse{
    checkin:CheckIn
}

export class CheckinUseCase{
    constructor(private checkinRepository: CheckInRepository){}

    async execute({userId,gymId}:CheckinUseCaseRequest): Promise<CheckinUseCaseResponse>{
        
        const checkin= await this.checkinRepository.create({
            user_id: userId,
            gym_id: gymId
        });

        return {checkin};
    }
}