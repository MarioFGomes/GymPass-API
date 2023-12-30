import { expect,describe,it, beforeEach } from 'vitest';
import bcrypt from 'bcrypt';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { GetUserProfileUseCase } from './get-user-profile';
import { ResourceNotFoundError } from '@/UseCases/errors/resource-not-found-error';


let userRepository:InMemoryUsersRepository;
let sut:GetUserProfileUseCase;
describe('Get User Profile Use Case', () => {

    beforeEach(() => {
        userRepository=new InMemoryUsersRepository();
        sut=new GetUserProfileUseCase(userRepository);
    });

    it('should be able to get user profile',async () => {

        const saltRounds = 6;
        const salt = bcrypt.genSaltSync(saltRounds);
        const password_hash = bcrypt.hashSync('123456', salt);

        const createdUser=await userRepository.create({
            name: 'John Doe',
            email:'jhondoe@example.com',
            password_hash
        });

        const  { user } =await sut.execute({
            user_id:createdUser.id,
        });

        expect(user.name).toEqual('John Doe');
    });

    it('should be able to authenticate with wrong email',async () => {

        await expect(()=>
            sut.execute({
                user_id:'non-existing-id'
            })).rejects.toBeInstanceOf(ResourceNotFoundError);
    });
});