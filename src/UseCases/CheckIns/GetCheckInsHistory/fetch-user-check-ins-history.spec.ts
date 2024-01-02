import { expect,describe,it, beforeEach } from 'vitest';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { FetchUserCheckInsHistoryUseCase } from './fetch-user-check-ins-history';


let CheckInsRepository:InMemoryCheckInsRepository;
let sut:FetchUserCheckInsHistoryUseCase;
describe('Check-in History Use Case', () => {

    beforeEach(() => {
        CheckInsRepository=new InMemoryCheckInsRepository();
        sut = new FetchUserCheckInsHistoryUseCase(CheckInsRepository);

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

        const {CheckIns}= await sut.execute({
            userId: 'user-01',
            page:1
        });

        expect(CheckIns).toHaveLength(2);
        expect(CheckIns).toEqual([
            expect.objectContaining({gym_id:'gym-01'}),
            expect.objectContaining({gym_id:'gym-02'}),
        ]);
    });

    it('should be able to fetch check-in history pagination',async () => {
        
        for(let i = 1; i <=22; i++) {
            await CheckInsRepository.create({
                gym_id:`gym-0${i}`,
                user_id:'user-01',
            });
        }
        
        const {CheckIns}= await sut.execute({
            userId: 'user-01',
            page:2
        });

        expect(CheckIns).toHaveLength(2);
    });

});