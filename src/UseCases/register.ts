import { UsersRepository } from '@/repositories/users-repository';
import bcrypt from 'bcrypt';
import { UserAlreadyExistsError } from './errors/users-already-exists-error';

interface RegisterUseCaseRequest{
   name: string,
   email: string, 
   password:string,
}
export class RegisterUseCase{

    constructor(private usersRepository:UsersRepository){}

    async execute({name, email, password}:RegisterUseCaseRequest){

        const saltRounds = 6;
        const salt = bcrypt.genSaltSync(saltRounds);
        const password_hash = bcrypt.hashSync(password, salt);

        const userWithSameEmail=await this.usersRepository.findByEmail(email);
        
        if(userWithSameEmail) throw new UserAlreadyExistsError();
    
        
        await this.usersRepository.create({
            name,
            email,
            password_hash
        });
    } 
}