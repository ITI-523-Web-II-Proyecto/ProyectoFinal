import { Entity, PrimaryGeneratedColumn, Unique, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { MinLength, IsNotEmpty, IsEmail, MaxLength, IsBoolean, IsDate, IsDateString, IsOptional } from 'class-validator';
import * as bcrypt from 'bcryptjs';



@Entity()
@Unique(['username'])         // Aqui declaramos que sea Unique para cuando ingrese el mismo Usuario reviente o avise que ese usuario ya esta creado.
export class Usuarios {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 50, nullable: false})
    @MaxLength(50, {message: 'Debe contener un máximo de 50 caracteres.'})
    @IsNotEmpty({message: 'Por favor indicar su Usuario completo.'})
    username: string;

    @Column()
    @MinLength(6)
    @MaxLength(50)
    @IsEmail()                  // Decorador de class validator para que solo acepte formato de correo electronico
    @IsNotEmpty()
    email: string;

    @Column()
    @MinLength(6)
    @IsNotEmpty()
    password: string;

    @Column()
    @IsNotEmpty()
    role: string;

    @Column()
    @IsOptional()
    @IsNotEmpty()
    resetToken: string;
  
    @Column()
    @IsOptional()
    @IsNotEmpty()
    refreshToken: string;

    @Column()
    @IsNotEmpty()
    estado: boolean; 

  // Metodos de Usuario

  /*
  -----------------------------------------------------------------------
  Cuando nosotros encriptamos generamos un salt esto viene siendo como la
  cantidad de ciclos que reloj que necesita el procesador para encriptar
  el dato eso quiere decir que entre más salt tenga va ser más dificil 
  desencriptar el dato, ósea va ser más seguro lo que pasa que entre más
  salt más ciclos de procesador voy a necesitar para poder encriptar y 
  comparar esos datos.
  Por defecto general se maneja en 10.
  Si ya es algo más grande y por defectos ocupamos mayor seguridad 
  dependera de nosotros administrarle esa cantidad de salt.
  -----------------------------------------------------------------------
  */

    hashPassword(): void {
        const salt = bcrypt.genSaltSync(10);
        this.password = bcrypt.hashSync(this.password, salt);
    }

  /*
  -----------------------------------------------------------------------
  CompareSync lo que hacer es comparar el password sin encriptar que 
  envía el usuario con el password ya encriptado que ya esta en la 
  base de datos.
  -----------------------------------------------------------------------
  */
 
    checkPassword(password: string): boolean {
        return bcrypt.compareSync(password, this.password);           
    }                                                              

}
