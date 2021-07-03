import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";
import { Request } from 'express';
import ItemToPoint from './ItemToPoint';
import User from "./User";
import { buildUrl } from "../utils/urls";

export interface SerializedPoint {
    id: number;
    image: string;
    name: string;
    email: string;
    whatsapp: string;
    latitude: number;
    longitude: number;
    city: string;
    uf: string;
    created_at: string;
    updated_at: string;
}

@Entity()
export default class Point {
    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column()
    image!: string;
    
    @Column()
    name!: string;
    
    @Column({
        unique: true,
    })
    email!: string;

    @Column({
        unique: true,
        length: 11,
    })
    whatsapp!: string;

    @Column('double')
    latitude!: number;

    @Column('double')
    longitude!: number;

    @Column({
        length: 60,
    })
    city!: string;

    @Column({
        length: 2,
    })
    uf!: string;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;

    @ManyToOne((type) => User, (user) => user.points)
    user!: User;

    @OneToMany((type) => ItemToPoint, (point) => point.item)
    items!: ItemToPoint[];

    serialize(request: Request): SerializedPoint  {
        return {
            id: this.id,
            image: buildUrl(request, `static/points/${this.image}`),
            name: this.name,
            email: this.email,
            whatsapp: this.whatsapp,
            latitude: this.latitude,
            longitude: this.longitude,
            city: this.city,
            uf: this.uf,
            created_at: String(this.created_at),
            updated_at: String(this.updated_at),
        };
    }
}
