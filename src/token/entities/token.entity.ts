import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Token {

    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column({ unique: true })
    token: string;

    @Column({ default: true })
    active: boolean;

    @Column({ default: 10 })
    reqLeft: number;
}
