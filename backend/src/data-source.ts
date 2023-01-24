import "reflect-metadata"
import { DataSource } from "typeorm"
import User from "./entity/User"
import Photo from "./entity/Photo"


export const AppDataSource = new DataSource({
    type: "mongodb",
    host: "localhost",
    port: 27017,
    database: "photoGallery",
    synchronize: true,
    logging: false,
    entities: [User, Photo],
    migrations: [],
    subscribers: [],
})
