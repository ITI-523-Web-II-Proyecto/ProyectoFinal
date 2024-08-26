import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, PrimaryColumn } from "typeorm";
import { Persona } from "./Persona";
import { IsNotEmpty, IsNumber } from "class-validator";

@Entity()
export class Certificado {
    @PrimaryColumn()
    id_certificado: string;

    @Column({ length: 255, nullable: false })
    @IsNotEmpty({message: 'Por favor indicaar una descripción.'})
    descripcion: string;

    @Column({ length: 100, nullable: false })
    @IsNotEmpty({message: 'Por favor indicar una categoria.'})
    categoria: string;

    @Column({ length: 100, nullable: false })
    @IsNotEmpty({message: 'Por favor indicar la institución donde obtuvo su certificado.'})
    institucion: string;

    @Column({ type: "int", nullable: false })
    @IsNotEmpty({message: 'Por favor indicar el año en el que obtuvo su certificado.'})
    @IsNumber({}, {message: 'El año debe ser un número entero.'})
    año: number;

    @Column({default:1})
    estado: boolean;

    @ManyToOne(() => Persona, persona => persona.certificados)
    persona: Persona;
}
