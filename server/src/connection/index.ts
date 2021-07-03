import { Connection, createConnection } from 'typeorm';
import { Entities } from '../entities';
import config from '../config';

export default async function newConnection(): Promise<Connection | null> {
    let conn: Connection | null = null;
    try {
        conn = await createConnection({
            type: 'mysql',
            host: String(config.sqlHost),
            port: Number(config.sqlPort),
            username: String(config.sqlUser),
            password: String(config.sqlPassword),
            database: String(config.sqlDatabase),
            entities: Entities,
            synchronize: true,
            logging: false,
        });
    } catch (error) {
        console.log(JSON.stringify(error, null, 4));
        conn = null;
    }
    return conn;
}
