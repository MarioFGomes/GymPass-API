import { Gym, Prisma } from '@prisma/client';
import { FindManyNearbyParams, GymRepository } from '../gyms-repository';
import { prisma } from '@/lib/prisma';


export class PrismaGymsRepository implements GymRepository{
    
    async findById(Id: string) {
        const gym=await prisma.gym.findUnique({
            where: {
                id: Id,
            }
        });

        return gym;
    }


    async FindManyNearBy({latitude,
        longitude}: FindManyNearbyParams) {
        const gyms =await prisma.$queryRaw<Gym[]>`
       SELECT * FROM gyms
       WHERE (6371 * acos(cos(radians(${latitude}))*cos(radians(latitude))*cos(radians(longitude)-radians(${longitude}))+sin(radians(${latitude}))* sin(radians(latitude))))<=10
    `;

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
        });
        return gyms;
    }


    async create(data: Prisma.GymCreateInput) {
        const gym =await prisma.gym.create({
            data
        });

        return gym;
    }
    
}