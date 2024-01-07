import { Gym, Prisma} from '@prisma/client';

export interface FindManyNearbyParams{
    latitude:number;
    longitude:number;
}

export interface GymRepository{
    findById(Id:string):Promise<Gym | null>;
    FindManyNearBy(params:FindManyNearbyParams):Promise<Gym[]>
    SearchMany(query:string, page:number):Promise<Gym[]>
    create(gym:Prisma.GymCreateInput):Promise<Gym>
    save(Id:string,data:Gym):Promise<Gym>
}