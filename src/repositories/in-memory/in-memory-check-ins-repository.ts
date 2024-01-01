import { Prisma, CheckIn } from '@prisma/client';
import { randomUUID } from 'node:crypto';
import { CheckInRepository } from '../check-ins-repository';
import dayjs from 'dayjs';

export class InMemoryCheckInsRepository implements CheckInRepository{
    async findByUserIdOnDate(userId: string, date: Date) {
        const startOfTheDay=dayjs(date).startOf('date');
        const endOfTheDay=dayjs(date).endOf('date');

        const CheckInOnSameDate=this.items.find((checkIn) =>{
            const checkInDate=dayjs(checkIn.created_at);
            const isOnSameDate=checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay);
            
            return checkIn.user_id === userId && isOnSameDate;
        } );
        if(!CheckInOnSameDate) return null;
        return CheckInOnSameDate;
    }

    public items: CheckIn[] = [];

    async create(data: Prisma.CheckInUncheckedCreateInput) {
        const checkIn={
            id:randomUUID(),
            user_id: data.user_id,
            gym_id: data.gym_id,
            validate_at: data.validate_at ? new Date(data.validate_at) : null,
            created_at:new Date(),
        };

        this.items.push(checkIn);

        return checkIn;
    }

   

}