import { expect,describe,it, beforeEach,afterEach } from 'vitest';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { ValidateCheckInUseCase } from './validate-check-ins';
import { ResourceNotFoundError } from '@/UseCases/errors/resource-not-found-error';



let CheckInsRepository:InMemoryCheckInsRepository;
let sut:ValidateCheckInUseCase;

describe('Validate Check-in Use Case', () => {

    beforeEach(() => {
        CheckInsRepository=new InMemoryCheckInsRepository();
        sut = new ValidateCheckInUseCase(CheckInsRepository);
        // vi.useFakeTimers();
    });
    afterEach(() => {
        //vi.useRealTimers();
    });

    it('should be able to validate check in',async () => {
        const CreatedCheckIn=await CheckInsRepository.create({
            gym_id: 'gym_id-01',
            user_id: 'user_id-01'
        });

        const  { CheckIn } =await sut.execute({
            CheckInId:CreatedCheckIn.id
        });

        expect(CheckIn.validate_at).toEqual(expect.any(Date));
        expect(CheckInsRepository.items[0].validate_at).toEqual(expect.any(Date));
    });

    it('should not be able to validate an inexistent check-in',async () => {

        await expect(()=>
            sut.execute({
                CheckInId:'id-001'
            }),
        ).rejects.toBeInstanceOf(ResourceNotFoundError);
    });

});