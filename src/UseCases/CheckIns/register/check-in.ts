import { CheckInRepository } from '@/repositories/check-ins-repository';
import { GymRepository } from '@/repositories/gyms-repository';
import { CheckIn,  } from '@prisma/client';
import { ResourceNotFoundError } from '../../errors/resource-not-found-error';
import { getDistanceBetweenCoordinate } from '@/utils/get-distance-between-coordinate';
import { MaxDistanceError } from '../../errors/max-distance-error';
import { MaxNumberOfCheckInsError } from '../../errors/max-number-of-check-ins-error';

interface CheckInUseCaseRequest{
  userId: string,
  gymId:string,
  userLatitude: number,
  userLongitude:number,
}

interface CheckInUseCaseResponse{
    CheckIn:CheckIn
}

export class CheckInUseCase{
    constructor(
        private checkInRepository: CheckInRepository,
        private gymRepository: GymRepository
    ){}

    async execute({userId,gymId,userLatitude,userLongitude}:CheckInUseCaseRequest): Promise<CheckInUseCaseResponse>{
        
        const gym=await this.gymRepository.findById(gymId);
        if(!gym) throw new ResourceNotFoundError();

        const distance=getDistanceBetweenCoordinate(
            {latitude:userLatitude, longitude:userLongitude},
            {latitude:gym.latitude.toNumber(), longitude:gym.longitude.toNumber()}
        );
        
        const MaxDistance_In_Kilometers=0.1;
        if(distance >MaxDistance_In_Kilometers) throw new MaxDistanceError();
        
        const CheckInOnSameDate=await this.checkInRepository.findByUserIdOnDate(userId,new Date());
        if(CheckInOnSameDate) throw new MaxNumberOfCheckInsError();

        const CheckIn= await this.checkInRepository.create({
            user_id: userId,
            gym_id: gymId,
            

        });

        return {CheckIn};
    }
}