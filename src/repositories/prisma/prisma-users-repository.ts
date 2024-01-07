import {prisma} from '@/lib/prisma';
import { Prisma, User } from '@prisma/client';
import { UsersRepository } from '../users-repository';
import { getRedis, setRedis } from '@/config/Redis';

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

        const userRedis=await getRedis(`user-${Id}`);
        
        if(userRedis){
            return JSON.parse(userRedis);
        }

        const user=await prisma.user.findUnique({
            where:{
                id: Id,
            }
        });

        if(user) await setRedis(`user-${user.id}`,JSON.stringify(user));

        return user;
    }

    async save(Id:string,data:User){
        const user=await prisma.user.update({
            where: {
                id:Id
            },
            data
        });
        return user;
    }
}