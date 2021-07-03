import {
    Entity,
    Column,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import ItemToPoint from './ItemToPoint';

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
}
