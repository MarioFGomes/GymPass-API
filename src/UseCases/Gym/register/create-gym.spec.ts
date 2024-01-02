import { expect,describe,it, beforeEach } from 'vitest';
import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym-repository';
import { CreateGymUseCase } from './create-gym';


let gymRepository:InMemoryGymRepository;
let sut:CreateGymUseCase;
describe('Register Use Case', () => {

    beforeEach(() => {
        gymRepository=new InMemoryGymRepository();
        sut = new CreateGymUseCase(gymRepository);

    });

    it('should be able to create gym',async () => {
        const { gym }=await sut.execute({
            name:'JavaScript Gym',
            description:'code academe',
            phone:'123456',
            latitude:-8.8834048,
            longitude:13.2513792
        });

        expect(gym.id).toEqual(expect.any(String));
    });

});