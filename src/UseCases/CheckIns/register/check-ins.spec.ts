import { expect,describe,it, beforeEach,afterEach,vi } from 'vitest';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { CheckInUseCase } from './check-in';
import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym-repository';
import { MaxDistanceError } from '../../errors/max-distance-error';
import { MaxNumberOfCheckInsError } from '../../errors/max-number-of-check-ins-error';



let CheckInsRepository:InMemoryCheckInsRepository;
let sut:CheckInUseCase;
let gymRepository:InMemoryGymRepository;
describe('Check-in Use Case', () => {

    beforeEach(() => {
        CheckInsRepository=new InMemoryCheckInsRepository();
        gymRepository=new InMemoryGymRepository();
        sut = new CheckInUseCase(CheckInsRepository,gymRepository);
        vi.useFakeTimers();
    });
    afterEach(() => {
        vi.useRealTimers();
    });

    it('should be able to check in',async () => {
        gymRepository.create({
            id:'gym-001',
            name: 'gym-initialized',
            description:'gym for especial people',
            phone:'932041319',
            latitude:-8.8834048,
            longitude:13.2513792
            
        });
        const  { CheckIn } =await sut.execute({
            gymId:'gym-001',
            userId: 'user-001',
            userLatitude: -8.8834048,
            userLongitude:13.2513792,
        });

        expect(CheckIn.id).toEqual(expect.any(String));
    });

    it('should not be able to check in twice in the same day',async () => {

        gymRepository.create({
            id:'gym-001',
            name: 'gym-initialized',
            description:'gym for especial people',
            phone:'932041319',
            latitude:-8.8834048,
            longitude:13.2513792
            
        });

        vi.setSystemTime(new Date(2024,0,1,10,0,0));

        await sut.execute({
            gymId:'gym-001',
            userId: 'user-001',
            userLatitude: -8.8834048,
            userLongitude:13.2513792,
        });

        await expect(()=>
            sut.execute({
                gymId:'gym-001',
                userId: 'user-001',
                userLatitude: -8.8834048,
                userLongitude:13.2513792,
            }),
        ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError);
    });

    it('should be able to check in twice but in different days',async () => {
        
        gymRepository.create({
            id:'gym-001',
            name: 'gym-initialized',
            description:'gym for especial people',
            phone:'932041319',
            latitude:-8.8834048,
            longitude:13.2513792
            
        });
        
        vi.setSystemTime(new Date(2024,0,12,8,0,0));

        await sut.execute({
            gymId:'gym-001',
            userId: 'user-001',
            userLatitude: -8.8834048,
            userLongitude:13.2513792,
        });

        vi.setSystemTime(new Date(2024,0,15,10,0,0));

        const { CheckIn } =await sut.execute({
            gymId:'gym-001',
            userId: 'user-001',
            userLatitude: -8.8834048,
            userLongitude:13.2513792,
        });

        expect(CheckIn.id).toEqual(expect.any(String));
    });


    it('should not be able to check in on distant gym',async () => {
        
        gymRepository.create({
            id:'gym-002',
            name: 'gym-initialized',
            description:'gym for especial people',
            phone:'932041319',
            latitude:-8.8834048,
            longitude:13.2513792
            
        });
        
        await expect(()=>

            sut.execute({
                gymId:'gym-002',
                userId: 'user-001',
                userLatitude: -9.0554108,
                userLongitude:13.258574,
            }),

        ).rejects.toBeInstanceOf(MaxDistanceError);
    });

});