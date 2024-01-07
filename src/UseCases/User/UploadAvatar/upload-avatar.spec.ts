import { expect,describe,it, beforeEach } from 'vitest';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { UserUploadAvatarUseCase } from './upload-avatar';
import { ResourceNotFoundError } from '@/UseCases/errors/resource-not-found-error';

let userRepository:InMemoryUsersRepository;
let sut:UserUploadAvatarUseCase;
describe('upload avatar Use Case', () => {

    beforeEach(() => {
        userRepository=new InMemoryUsersRepository();
        sut = new UserUploadAvatarUseCase(userRepository);

    });

    it('should be able to upload avatar',async () => {
        const CreatedUser=await userRepository.create({
            name: 'John Doe',
            email:'jhondoe@example.com',
            password_hash:'123456'
        });
        const  { user } =await sut.execute({
            user_id:CreatedUser.id,
            avatarUrl: 'https://gravatar.com/avatar/c9a1b217768fb2307abab8a6faf9e85b?s=400&d=robohash&r=x'
        });

        expect(user.avatarUrl).toEqual(expect.any(String));
    });

    it('should not able to upload avatar in user not found',async () => {
        

        await expect(
            sut.execute({
                user_id:'user-01',
                avatarUrl: 'https://gravatar.com/avatar/ae15c1e86238d700dc01cdf0ff477e52?s=400&d=robohash&r=x'
            })).rejects.toBeInstanceOf(ResourceNotFoundError);
    });

});