import {
    Entity,
    Column,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Request } from 'express';
import ItemToPoint from './ItemToPoint';
import { buildUrl } from '../utils/urls';

export interface SerializedItem {
    id: number;
    image: string;
    title: string;
}

@Entity()
export default class Item {
    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column()
    image!: string;
    
    @Column()
    title!: string;
    
    @OneToMany((type) => ItemToPoint, (point) => point.item)
    items!: ItemToPoint[];

    serialize(request: Request) : SerializedItem  {
        return {
            id: this.id,
            image: buildUrl(request, `uploads/${this.image}`),
            title: this.title,
        };
    }
}
