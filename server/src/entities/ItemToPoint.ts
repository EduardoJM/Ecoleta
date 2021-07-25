import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    ManyToOne,
} from "typeorm";
import Item from './Item';
import Point from './Point';

@Entity()
export default class ItemToPoint {
    @PrimaryGeneratedColumn()
    id!: number;
    
    @ManyToOne((type) => Item, (item) => item.items, { onDelete: 'CASCADE' })
    item!: Item;

    @ManyToOne((type) => Point, (point) => point.items, { onDelete: 'CASCADE' })
    point!: Point;
}
