import { expect,describe,it } from 'vitest';
import bcrypt from 'bcrypt';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository';
import { AuthenticateUseCase } from './authenticate';
import { InvalidCredentialsError } from '../errors/invalid-credentials-error';


describe('Authenticate Use Case', () => {


    it('should be able to authenticate',async () => {

        const userRepository=new InMemoryUsersRepository();
        const sut=new AuthenticateUseCase(userRepository);

        const saltRounds = 6;
        const salt = bcrypt.genSaltSync(saltRounds);
        const password_hash = bcrypt.hashSync('123456', salt);

        await userRepository.create({
            name: 'John Doe',
            email:'jhondoe@example.com',
            password_hash
        });

        const  { user } =await sut.execute({
            email:'jhondoe@example.com',
            password:'123456'
        });

        expect(user.id).toEqual(expect.any(String));
    });

    it('should be able to authenticate with wrong email',async () => {

        const userRepository=new InMemoryUsersRepository();
        const sut=new AuthenticateUseCase(userRepository);

        expect(()=>
            sut.execute({
                email:'jhondoe@example.com',
                password:'123456'
            })).rejects.toBeInstanceOf(InvalidCredentialsError);
    });

    it('should be able to authenticate with wrong password',async () => {

        const userRepository=new InMemoryUsersRepository();
        const sut=new AuthenticateUseCase(userRepository);

        const saltRounds = 6;
        const salt = bcrypt.genSaltSync(saltRounds);
        const password_hash = bcrypt.hashSync('123456', salt);

        await userRepository.create({
            name: 'John Doe',
            email:'jhondoe@example.com',
            password_hash
        });

        expect(()=>
            sut.execute({
                email:'jhondoe@example.com',
                password:'123456789'
            })).rejects.toBeInstanceOf(InvalidCredentialsError);
    });
});