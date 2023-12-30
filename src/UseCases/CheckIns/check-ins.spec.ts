import { expect,describe,it, beforeEach } from 'vitest';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { CheckinUseCase } from './check-in';


let CheckInsRepository:InMemoryCheckInsRepository;
let sut:CheckinUseCase;
describe('Check-in Use Case', () => {

    beforeEach(() => {
        CheckInsRepository=new InMemoryCheckInsRepository();
        sut = new CheckinUseCase(CheckInsRepository);
    });

    it('should be able to check in',async () => {
        const  { checkin } =await sut.execute({
            gymId:'gym-001',
            userId: 'user-001',
        });

        expect(checkin.id).toEqual(expect.any(String));
    });

});