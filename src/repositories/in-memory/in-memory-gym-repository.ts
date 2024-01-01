import {  Gym } from '@prisma/client';
import { GymRepository } from '../gyms-repository';

export class InMemoryGymRepository implements GymRepository{
 
    public items: Gym[] = [];
    async findById(Id: string){
        const gym=this.items.find(item => item.id === Id);
        if (!gym) {
            return null;
        }
        return gym;
    }

}