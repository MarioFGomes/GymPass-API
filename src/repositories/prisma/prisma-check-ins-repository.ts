import {Prisma} from '@prisma/client';
import { CheckInRepository } from '../check-ins-repository';
import { prisma } from '@/lib/prisma';
import dayjs from 'dayjs';

export class PrismaCheckInsRepository implements CheckInRepository{

    async findByUserIdOnDate(userId: string, date: Date) {
        const startOfTheDay=dayjs(date).startOf('date');
        const endOfTheDay=dayjs(date).endOf('date');

        const UserCheckIn=await prisma.checkIn.findMany({
            where:{
                user_id:userId
            }

        });
        if(!UserCheckIn){
            return null;
        }else{
            const CheckInOnSameDate=UserCheckIn.find((checkIn) => {
                const checkInDate=dayjs(checkIn.created_at);
                const isOnSameDate=checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay);
                return isOnSameDate;
            });

            if(!CheckInOnSameDate) return null;
            return CheckInOnSameDate;
        }

    }
    async create(data: Prisma.CheckInUncheckedCreateInput) {
        const CheckIn=await prisma.checkIn.create({
            data
        });

        return CheckIn;
    }

   
}