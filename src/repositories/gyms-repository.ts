import { Gym, Prisma} from '@prisma/client';


export interface GymRepository{
    findById(Id:string):Promise<Gym | null>;
    create(gym:Prisma.GymCreateInput):Promise<Gym>
}