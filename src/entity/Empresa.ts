import { IsEmail, IsNotEmpty, MaxLength } from "class-validator";
import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Puesto } from "./Puesto";

@Entity()
export class Empresa {
    @PrimaryColumn()
    id_empresa: string;

    @Column({length: 50, nullable: false})
    @MaxLength(50, {message: 'Debe contener un máximo de 50 caracteres.'})
    @IsNotEmpty({message: 'Por favor indocar su nombre completo.'})
    nombre: string;

    @Column({length: 255, nullable: false})
    @MaxLength(255, {message: 'Debe contener un máximo de 255 caracteres.'})
    @IsNotEmpty({message: 'Por favor indicar una url de su empresa.'})
    url: string;

    @Column({length: 20, nullable: false})
    @MaxLength(20, {message: 'Debe contener un máximo de 20 caracteres.'})
    @IsNotEmpty({message: 'Debe indicar su número de teléfono.'})
    telefono: string;

    @Column({length: 255, nullable: false})
    @MaxLength(255, {message: 'Debe contener un máximo de 255 caracteres.'})
    @IsNotEmpty({message: 'Debe indicar una dirección.'})
    direccion: string;

    @Column({length: 100, nullable: false})
    @MaxLength(100, {message: 'Debe contener un máximo de 100 caracteres.'})
    @IsNotEmpty({message: 'Debe indicar una contraseña.'})
    contraseña: string;

    @Column({default:1})
    estado: boolean;

    @OneToMany(() => Puesto, puesto => puesto.empresa)
    puestos:Puesto[];

}