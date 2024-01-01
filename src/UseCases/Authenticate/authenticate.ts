import { UsersRepository } from '@/repositories/users-repository';
import { InvalidCredentialsError } from '../errors/invalid-credentials-error';
import bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { setRedis } from '@/config/RedisConfig';

interface AuthenticateUseCaseRequest{
    email: string;
    password:string;
}

interface AuthenticateUseCaseResponse{
    user:User
}

export class AuthenticateUseCase{
    constructor(private usersRepository: UsersRepository){}

    async execute({email,password}:AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse>{
        
        const user= await this.usersRepository.findByEmail(email);

        if(!user) throw new InvalidCredentialsError();

        const doesPasswordMatches=await bcrypt.compare(password, user.password_hash);

        if(!doesPasswordMatches) throw new InvalidCredentialsError();

        await setRedis(`user-${user.id}`,JSON.stringify(user));

        return {user};
    }
}