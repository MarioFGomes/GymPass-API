import { Gym } from '@prisma/client';


export interface GymRepository{
    findById(Id:string):Promise<Gym | null>;
}