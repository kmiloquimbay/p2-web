import { Location } from "src/location/entities/location.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Character {

    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    name: string;

    @Column()
    salary: number;

    @Column()
    employee: boolean;

    @OneToOne(() => Location, location => location.owner)
    @JoinColumn()
    property: Location;

    @ManyToMany(() => Location, location => location.favCharacters)
    @JoinTable()
    favPlaces: Location[];
}
