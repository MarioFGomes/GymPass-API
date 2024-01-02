import { Gym, Prisma} from '@prisma/client';


export interface GymRepository{
    findById(Id:string):Promise<Gym | null>;
    SearchMany(query:string, page:number):Promise<Gym[]>
    create(gym:Prisma.GymCreateInput):Promise<Gym>
}