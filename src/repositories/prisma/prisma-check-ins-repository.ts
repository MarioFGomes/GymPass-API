import { getRedis, setRedis } from '@/config/RedisConfig';
import { CheckInRepository } from '../check-ins-repository';
import { prisma } from '@/lib/prisma';
import {Prisma,CheckIn} from '@prisma/client';
import dayjs from 'dayjs';

export class PrismaCheckInsRepository implements CheckInRepository{

    async findByUserIdOnDate(userId: string, date: Date) {
        const startOfTheDay=dayjs(date).startOf('date');
        const endOfTheDay=dayjs(date).endOf('date');

        const CheckIn=await prisma.checkIn.findFirst({
            where:{
                user_id:userId,
                created_at:{
                    gte:startOfTheDay.toDate(),
                    lte:endOfTheDay.toDate()
                }
            }

        });
        return CheckIn;
    }
    async create(data: Prisma.CheckInUncheckedCreateInput) {
        const CheckIn=await prisma.checkIn.create({
            data
        });

        return CheckIn;
    }

    async findManyByUserId(userId: string,page:number) {

        const CheckInsRedis=await getRedis(`UserCheckIn-${userId}/page-${page}`);

        if(CheckInsRedis) return JSON.parse(CheckInsRedis);

        const CheckIns=await prisma.checkIn.findMany({
            where:{
                user_id: userId
            },
            take:20,
            skip:(page-1)*20, 
        });

        if(CheckIns) await setRedis(`UserCheckIn-${userId}/page-${page}`,JSON.stringify(CheckIns));

        return CheckIns;
    }

    async countByUserId(userId: string) {
        const count=await prisma.checkIn.count({
            where:{
                user_id: userId
            }
        });
        return count;
    }

    async findById(CheckInId: string) {

        const CheckInsRedis=await getRedis(`checkIn-${CheckInId}`);
        
        if(CheckInsRedis) return JSON.parse(CheckInsRedis);

        const checkIn=await prisma.checkIn.findUnique({
            where:{
                id: CheckInId,
            }
        });

        if(checkIn) await setRedis(`checkIn-${checkIn.id}`,JSON.stringify(checkIn));

        return checkIn;
    }
    async save(checkIn:CheckIn)  {
        const checkIns=await prisma.checkIn.update({
            where: {
                id:checkIn.id
            },
            data: checkIn
        });
        return checkIns;
    }
}