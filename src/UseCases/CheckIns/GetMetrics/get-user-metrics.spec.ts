import { expect,describe,it, beforeEach } from 'vitest';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { GetUserMetricsUseCase } from './get-user-metrics';

let CheckInsRepository:InMemoryCheckInsRepository;
let sut:GetUserMetricsUseCase;
describe('Get User Metrics Use Case', () => {

    beforeEach(() => {
        CheckInsRepository=new InMemoryCheckInsRepository();
        sut = new GetUserMetricsUseCase(CheckInsRepository);

    });

    it('should be able to fetch check-in history',async () => {
        await CheckInsRepository.create({
            gym_id:'gym-01',
            user_id:'user-01',
        });

        await CheckInsRepository.create({
            gym_id:'gym-02',
            user_id:'user-01',
        });

        const {CheckInsCounts}= await sut.execute({
            userId: 'user-01'
        });

        expect(CheckInsCounts).toEqual(2);
    });


});