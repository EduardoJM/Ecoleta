import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
} from "typeorm";
import ItemToPoint from './ItemToPoint';

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

    @Column()
    password!: string;

    @Column({
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

    @OneToMany((type) => ItemToPoint, (point) => point.item)
    items!: ItemToPoint[];
}
