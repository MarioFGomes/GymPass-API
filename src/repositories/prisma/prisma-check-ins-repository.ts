import {Prisma} from '@prisma/client';
import { CheckInRepository } from '../check-ins-repository';
import { prisma } from '@/lib/prisma';

export class PrismaCheckInsRepository implements CheckInRepository{
    async create(data: Prisma.CheckInUncheckedCreateInput) {
        const checkin=await prisma.checkIn.create({
            data
        });

        return checkin;
    }

   
}