import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Empresa } from "./Empresa";
import { IsNotEmpty, MaxLength } from "class-validator";

@Entity()
export class Puesto {
    @PrimaryGeneratedColumn()
    id_puesto: number;

    @Column({ length: 100, nullable: false })
    @MaxLength(50, {message: 'Debe contener un máximo de 50 caracteres.'})
    @IsNotEmpty({message: 'Por favor indicar el nombre del puesto.'})
    nombrePuesto: string;

    @Column({ length: 255, nullable: false })
    @MaxLength(255, {message: 'Debe contener un máximo de 255 caracteres.'})
    @IsNotEmpty({message: 'Por favor indicar una descripción.'})
    descripcion: string;

    @Column({ length: 100, nullable: false })
    @MaxLength(100, {message: 'Debe contener un máximo de 100 caracteres.'})
    @IsNotEmpty({message: 'Por favor indicar un tiempo de contratación.'})
    tiempoContratacion: string;

    @Column({ length: 255, nullable: false })
    @MaxLength(255, {message: 'Debe contener un máximo de 255 caracteres.'})
    @IsNotEmpty({message: 'Por favor indicar los requisitos para este puesto.'})
    requisitos: string;

    @Column({default:1})
    estado: boolean;

    @ManyToOne(() => Empresa, empresa => empresa.puestos)
    empresa: Empresa;
}
