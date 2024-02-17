import { CheckIn,Prisma } from '@prisma/client';


export interface CheckInRepository{
    findByUserIdOnDate(userId:string, date:Date):Promise<CheckIn | null>
    findManyByUserId(userId:string,page:number):Promise<CheckIn[]>
    findById(CheckInId:string):Promise<CheckIn | null >
    countByUserId(userId:string):Promise<number>
    create(data:Prisma.CheckInUncheckedCreateInput):Promise<CheckIn>;
    save(data:CheckIn):Promise<CheckIn>
}