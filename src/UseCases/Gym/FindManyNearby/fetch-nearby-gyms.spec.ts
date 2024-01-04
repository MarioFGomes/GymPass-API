import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym-repository';
import { expect,describe,it, beforeEach } from 'vitest';
import { FindManyNearbyGymUseCase } from './fetch-nearby-gyms';


let gymRepository:InMemoryGymRepository;
let sut:FindManyNearbyGymUseCase;
describe('Search Gyms Use Case', () => {

    beforeEach(() => {
        gymRepository=new InMemoryGymRepository();
        sut = new FindManyNearbyGymUseCase(gymRepository);

    });

    it('should be able to fetch near Gym',async () => {
        await gymRepository.create({
            name:'Near Gym',
            description:'code academe',
            phone:'123456',
            latitude:-8.8834048,
            longitude:13.2513792
        });

        await gymRepository.create({
            name:'Far Gym',
            description:'code academe',
            phone:'123456',
            latitude:-9.106533,
            longitude:13.689631, 
        });

        const {gyms}= await sut.execute({
            UserLatitude:-8.8834048,
            UserLongitude:13.2513792
        });

        expect(gyms).toHaveLength(1);
        expect(gyms).toEqual([
            expect.objectContaining({name:'Near Gym'}),
        ]);
    });

});