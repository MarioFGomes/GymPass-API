import {prisma} from '@/lib/prisma';
import bcrypt from 'bcrypt';

interface RegisterUseCaseRequest{
   name: string,
   email: string, 
   password:string,
}
export async function registerUseCase({name, email, password}:RegisterUseCaseRequest){

    const saltRounds = 6;
    const salt = bcrypt.genSaltSync(saltRounds);
    const password_hash = bcrypt.hashSync(password, salt);

    const userWithSameEmail=await prisma.user.findUnique({
        where:{
            email
        }
    });
    
    if(userWithSameEmail) throw new Error('User with same email already exists');

    await prisma.user.create({
        data:{
            name,
            email,
            password_hash
        },
    });
} 