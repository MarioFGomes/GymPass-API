import { CheckInRepository } from '@/repositories/check-ins-repository';
import { CheckIn,  } from '@prisma/client';
import { ResourceNotFoundError } from '../../errors/resource-not-found-error';

interface ValidateCheckInnUseCaseRequest{
    CheckInId: string;
}

interface ValidateCheckInUseCaseResponse{
    CheckIn:CheckIn;
}

export class ValidateCheckInUseCase{
    constructor(
        private checkInRepository: CheckInRepository
    ){}

    async execute({CheckInId}:ValidateCheckInnUseCaseRequest): Promise<ValidateCheckInUseCaseResponse>{
        const CheckIn=await this.checkInRepository.findById(CheckInId);
        if(!CheckIn) throw new ResourceNotFoundError();
        
        CheckIn.validate_at=new Date();

        await this.checkInRepository.save(CheckIn);

        return {CheckIn};
    }
}