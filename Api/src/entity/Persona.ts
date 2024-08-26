import { IsEmail, IsNotEmpty, MaxLength } from "class-validator";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Certificado } from "./Certificado";

@Entity()
export class Persona {
    @PrimaryColumn()
    id_persona: string;

    @Column({length: 50, nullable: false})
    @MaxLength(50, {message: 'Debe contener un máximo de 50 caracteres.'})
    @IsNotEmpty({message: 'Por favor indicar su nombre completo.'})
    nombre: string;

    @Column({length: 100, nullable: false})
    @MaxLength(50, {message: 'Debe contener un máximo de 100 caracteres.'})
    @IsNotEmpty({message: 'Debe indicar un correo electrónico.'})
    @IsEmail({},{message: 'Debe indicar un correo electrónico válido'})
    email: string;

    @Column({length: 20, nullable: false})
    @MaxLength(20, {message: 'Debe contener un máximo de 20 caracteres.'})
    @IsNotEmpty({message: 'Debe indicar su número de teléfono.'})
    telefono: string;

    @Column({length: 100, nullable: false})
    @MaxLength(100, {message: 'Debe contener un máximo de 100 caracteres.'})
    @IsNotEmpty({message: 'Debe indicar una contraseña.'})
    contraseña: string;

    @Column({default:1})
    estado: boolean;

    @OneToMany(() => Certificado, certificado => certificado.persona)
    certificados:Certificado[];

}