import {  Gym, Prisma } from '@prisma/client';
import { FindManyNearbyParams, GymRepository } from '../gyms-repository';
import { randomUUID } from 'node:crypto';
import { getDistanceBetweenCoordinate } from '@/utils/get-distance-between-coordinate';

export class InMemoryGymRepository implements GymRepository{
    
    public items: Gym[] = [];
    async findById(Id: string){
        const gym=this.items.find(item => item.id === Id);
        if (!gym) {
            return null;
        }
        return gym;
    }

    async create(data: Prisma.GymCreateInput){
        const gym={
            id:data.id ?? randomUUID(),
            name:data.name,
            description:data.description ?? null,
            phone:data.phone?? null,
            latitude:new Prisma.Decimal(data.latitude.toString()),
            longitude:new Prisma.Decimal(data.longitude.toString()),
            created_at:new Date(),
        };

        this.items.push(gym);

        return gym;
    }

    async SearchMany(query: string, page: number) {
        return this.items.
            filter(item => item.name.includes(query))
            .slice((page-1)*20, page*20);
    }

    async FindManyNearBy(params: FindManyNearbyParams) {
        return this.items.filter((item) =>{
            const distance=getDistanceBetweenCoordinate(
                {latitude:params.Latitude,longitude:params.Longitude},
                {latitude:item.latitude.toNumber(),longitude:item.longitude.toNumber()}
            );

            return distance<10;
        }); 
    }


}