import { UsersRepository } from '@/repositories/users-repository';
import bcrypt from 'bcrypt';
import { UserAlreadyExistsError } from '../../errors/users-already-exists-error';
import { User } from '@prisma/client';

interface RegisterUseCaseRequest{
   name:        string,
   email:       string, 
   password:    string,
   avatarUrl?:   string 
}

interface ResponseUseCaseRegister{
    user:User
}
export class RegisterUseCase{

    constructor(private usersRepository:UsersRepository){}

    async execute({name, email, password,avatarUrl}:RegisterUseCaseRequest):Promise<ResponseUseCaseRegister>{

        const saltRounds = 6;
        const salt = bcrypt.genSaltSync(saltRounds);
        const password_hash = bcrypt.hashSync(password, salt);

        const userWithSameEmail=await this.usersRepository.findByEmail(email);
        
        if(userWithSameEmail) throw new UserAlreadyExistsError();
    
        
        const user=await this.usersRepository.create({
            name,
            email,
            password_hash,
            avatarUrl
        });

        return {
            user
        };
    } 
}