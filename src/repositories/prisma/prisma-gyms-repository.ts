import { getRedis, setRedis } from '@/config/Redis';
import { Gym, Prisma } from '@prisma/client';
import { FindManyNearbyParams, GymRepository } from '../gyms-repository';
import { prisma } from '@/lib/prisma';


export class PrismaGymsRepository implements GymRepository{
    async findById(Id: string) {

        const GymRedis=await getRedis(`gym-${Id}`);
        
        if(GymRedis){
            return JSON.parse(GymRedis);
        }

        const gym=await prisma.gym.findUnique({
            where: {
                id: Id,
            }
        });

        if(gym) await setRedis(`gym-${gym.id}`,JSON.stringify(gym));

        return gym;
    }

    async FindManyNearBy({latitude,longitude}: FindManyNearbyParams) {

        const GymRedis=await getRedis(`gym_latitude-${latitude}/gym_longitude:${longitude}`);
        
        if(GymRedis){
            return JSON.parse(GymRedis);
        }
        const gyms =await prisma.$queryRaw<Gym[]>`
       SELECT * FROM gyms
       WHERE (6371 * acos(cos(radians(${latitude}))*cos(radians(latitude))*cos(radians(longitude)-radians(${longitude}))+sin(radians(${latitude}))* sin(radians(latitude))))<=10
    `;

        if(gyms) await setRedis(`gym_latitude-${latitude}/gym_longitude:${longitude}`,JSON.stringify(gyms));

        return gyms;
    }


    async SearchMany(query: string, page: number) {

        const gyms= await prisma.gym.findMany({
            where:{
                name:{
                    contains: query,
                },
            },
            take:20,
            skip:(page-1)*20,
            orderBy: { name: 'asc'},
        });
        return gyms;
    }


    async create(data: Prisma.GymCreateInput) {
        const gym =await prisma.gym.create({
            data
        });

        return gym;
    }

    async save(Id: string, data:Gym) {
        const gym=await prisma.gym.update({
            where: {
                id:Id
            },
            data
        });
        return gym;
    }
    
}