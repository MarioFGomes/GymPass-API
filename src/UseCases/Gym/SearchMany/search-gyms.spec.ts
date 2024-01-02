import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym-repository';
import { expect,describe,it, beforeEach } from 'vitest';
import { SearchGymUseCase } from './search-gyms';

let gymRepository:InMemoryGymRepository;
let sut:SearchGymUseCase;
describe('Search Gyms Use Case', () => {

    beforeEach(() => {
        gymRepository=new InMemoryGymRepository();
        sut = new SearchGymUseCase(gymRepository);

    });

    it('should be able to search Gym',async () => {
        await gymRepository.create({
            name:'JavaScript Gym',
            description:'code academe',
            phone:'123456',
            latitude:-8.8834048,
            longitude:13.2513792
        });

        await gymRepository.create({
            name:'TypeScript Gym',
            description:'code academe',
            phone:'123456',
            latitude:-8.8834048,
            longitude:13.2513792
        });

        const {gyms}= await sut.execute({
            query: 'JavaScript Gym',
            page:1
        });

        expect(gyms).toHaveLength(1);
        expect(gyms).toEqual([
            expect.objectContaining({name:'JavaScript Gym'}),
        ]);
    });

    it('should be able to fetch paginated gyms search',async () => {
        
        for(let i = 1; i <=22; i++) {
            await gymRepository.create({
                name:`TypeScript Gym ${i}`,
                description:'code academe',
                phone:'123456',
                latitude:-8.8834048,
                longitude:13.2513792
            });
        }
        
        const {gyms}= await sut.execute({
            query: 'TypeScript',
            page:2
        });

        expect(gyms).toHaveLength(2);
        expect(gyms).toEqual([
            expect.objectContaining({name:'TypeScript Gym 21'}),
            expect.objectContaining({name:'TypeScript Gym 22'}),
        ]); 
    });

});