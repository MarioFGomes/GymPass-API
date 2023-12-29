import { expect,describe,it } from 'vitest';
import {RegisterUseCase} from '@/UseCases/User/register/register';
import bcrypt from 'bcrypt';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { UserAlreadyExistsError } from '@/UseCases/errors/users-already-exists-error';


describe('Register Use Case', () => {


    it('should be able to register',async () => {

        const userRepository=new InMemoryUsersRepository();
        const registerUseCase=new RegisterUseCase(userRepository);

        const  { user } =await registerUseCase.execute({
            name: 'John Doe',
            email:'jhondoe@example.com',
            password:'123456'
        });

        expect(user.id).toEqual(expect.any(String));
    });


    it('should hash user password up on registration',async () => {

        const userRepository=new InMemoryUsersRepository();
        const registerUseCase=new RegisterUseCase(userRepository);

        const  { user } =await registerUseCase.execute({
            name: 'John Doe',
            email:'jhondoe@example.com',
            password:'123456'
        });

        const isPasswordCorrectlyHashed=await bcrypt.compare('123456',user.password_hash);

        expect(isPasswordCorrectlyHashed).toBe(true);
    });


    it('should not be able to register with same email twice',async () => {

        const userRepository=new InMemoryUsersRepository();
        const registerUseCase=new RegisterUseCase(userRepository);

        const email='johndoe@example.com';

        await registerUseCase.execute({
            name: 'John Doe',
            email,
            password:'123456'
        });

        await expect(() => 
            registerUseCase.execute({
                name: 'John Doe',
                email,
                password:'123456'
            }),
        ).rejects.toBeInstanceOf(UserAlreadyExistsError);

    });
});