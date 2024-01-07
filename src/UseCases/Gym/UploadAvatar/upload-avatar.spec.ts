import { expect,describe,it, beforeEach } from 'vitest';
import { InMemoryGymRepository } from '@/repositories/in-memory/in-memory-gym-repository';
import { GymUploadAvatarUseCase} from './upload-avatar';
import { ResourceNotFoundError } from '@/UseCases/errors/resource-not-found-error';


let gymRepository:InMemoryGymRepository;
let sut:GymUploadAvatarUseCase;
describe('Upload Avatar for Gym Use Case', () => {

    beforeEach(() => {
        gymRepository=new InMemoryGymRepository();
        sut = new GymUploadAvatarUseCase(gymRepository);

    });

    it('should be able to upload avatar for gym',async () => {
        const  CreatedGym =await gymRepository.create({
            name:'JavaScript Gym',
            description:'code academe',
            phone:'123456',
            latitude:-8.8834048,
            longitude:13.2513792
        });

        const {gym}= await sut.execute({
            gym_id:CreatedGym.id,
            avatarUrl:'https://gravatar.com/avatar/b1e5a4213d0c34459788ff593d7112ca?s=400&d=robohash&r=x',
        });

        expect(gym.id).toEqual(expect.any(String));
    });

    it('should not able to upload avatar for gym not found',async () => {

        await expect(sut.execute({
            gym_id:'gym-01',
            avatarUrl:'https://gravatar.com/avatar/f62dd5edb7d7a7d07c8d3ca028727773?s=400&d=robohash&r=x'
        })).rejects.toBeInstanceOf(ResourceNotFoundError);
    });

});