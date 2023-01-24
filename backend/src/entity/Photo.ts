import { Entity, Column, ObjectIdColumn, ObjectID, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Photo {
    @PrimaryGeneratedColumn()
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    name: string;

    @Column()
    url: string;
}