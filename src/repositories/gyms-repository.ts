import { Gym, Prisma} from '@prisma/client';

export interface FindManyNearbyParams{
    Latitude:number;
    Longitude:number;
}

export interface GymRepository{
    findById(Id:string):Promise<Gym | null>;
    FindManyNearBy(params:FindManyNearbyParams):Promise<Gym[]>
    SearchMany(query:string, page:number):Promise<Gym[]>
    create(gym:Prisma.GymCreateInput):Promise<Gym>
}