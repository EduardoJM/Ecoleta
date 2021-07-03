import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";
import ItemToPoint from './ItemToPoint';
import User from "./User";

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
}
