import { CheckInRepository } from '@/repositories/check-ins-repository';
import { GymRepository } from '@/repositories/gyms-repository';
import { CheckIn,  } from '@prisma/client';
import { ResourceNotFoundError } from '../errors/resource-not-found-error';

interface CheckInnUseCaseRequest{
  userId: string,
  gymId:string,
  userLatitude: number,
  userLongitude:number,
}

interface CheckinUseCaseResponse{
    CheckIn:CheckIn
}

export class CheckinUseCase{
    constructor(
        private checkInRepository: CheckInRepository,
        private gymRepository: GymRepository
    ){}

    async execute({userId,gymId}:CheckInnUseCaseRequest): Promise<CheckinUseCaseResponse>{
        
        const gym=await this.gymRepository.findById(gymId);
        if(!gym) throw new ResourceNotFoundError();
        
        const CheckInOnSameDate=await this.checkInRepository.findByUserIdOnDate(userId,new Date());
        if(CheckInOnSameDate) throw new Error();

        const CheckIn= await this.checkInRepository.create({
            user_id: userId,
            gym_id: gymId
        });

        return {CheckIn};
    }
}