import { expect,describe,it, beforeEach } from 'vitest';
import {RegisterUseCase} from '@/UseCases/User/register/register';
import bcrypt from 'bcrypt';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { UserAlreadyExistsError } from '@/UseCases/errors/users-already-exists-error';


let userRepository:InMemoryUsersRepository;
let sut:RegisterUseCase;
describe('Register Use Case', () => {

    beforeEach(() => {
        userRepository=new InMemoryUsersRepository();
        sut = new RegisterUseCase(userRepository);

    });

    it('should be able to register',async () => {

       

        const  { user } =await sut.execute({
            name: 'John Doe',
            email:'jhondoe@example.com',
            password:'123456'
        });

        expect(user.id).toEqual(expect.any(String));
    });


    it('should hash user password up on registration',async () => {

        const  { user } =await sut.execute({
            name: 'John Doe',
            email:'jhondoe@example.com',
            password:'123456'
        });

        const isPasswordCorrectlyHashed=await bcrypt.compare('123456',user.password_hash);

        expect(isPasswordCorrectlyHashed).toBe(true);
    });


    it('should not be able to register with same email twice',async () => {

        const email='johndoe@example.com';

        await sut.execute({
            name: 'John Doe',
            email,
            password:'123456'
        });

        await expect(() => 
            sut.execute({
                name: 'John Doe',
                email,
                password:'123456'
            }),
        ).rejects.toBeInstanceOf(UserAlreadyExistsError);

    });
});