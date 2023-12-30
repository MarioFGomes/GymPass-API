import { Prisma, CheckIn } from '@prisma/client';
import { randomUUID } from 'node:crypto';
import { CheckInRepository } from '../check-ins-repository';

export class InMemoryCheckInsRepository implements CheckInRepository{

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