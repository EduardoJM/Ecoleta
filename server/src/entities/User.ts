import {
    Entity,
    Column,
    OneToMany,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";
import { Request } from 'express';
import bcrypt from 'bcryptjs';
import Point from './Point';
import { buildUrl } from '../utils/urls';

export interface SerializedUser {
    id: number;
    name: string;
    email: string;
    avatar: string;
    created_at: string;
    updated_at: string;
}

@Entity()
export default class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;
        
    @Column()
    email!: string;

    @Column()
    password!: string;

    @Column()
    avatar!: string;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;

    @OneToMany((type) => Point, (point) => point.user)
    points!: Point[];

    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 10);
    }

    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password);
    }

    serialize(request: Request): SerializedUser  {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            avatar: buildUrl(request, `static/avatars/${this.avatar}`),
            created_at: String(this.created_at),
            updated_at: String(this.updated_at),
        };
    }
}
