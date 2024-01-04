import {prisma} from '@/lib/prisma';
import {Prisma} from '@prisma/client';
import { UsersRepository } from '../users-repository';
import { getRedis, setRedis } from '@/config/RedisConfig';

export class PrismaUsersRepository implements UsersRepository{

    async create(data:Prisma.UserCreateInput){
        const user=await prisma.user.create({
            data
        });

        return user;
    }

    async findByEmail(email:string){

        const userRedis=await getRedis(`user-${email}`);
        
        if(userRedis){
            return JSON.parse(userRedis);
        }

        const user=await prisma.user.findUnique({
            where:{
                email
            }
        });

        if(user) await setRedis(`user-${user.email}`,JSON.stringify(user));

        return user;
    }

    async findById(Id: string) {

        const user=await prisma.user.findUnique({
            where:{
                id: Id,
            }
        });

        return user;
    }
}