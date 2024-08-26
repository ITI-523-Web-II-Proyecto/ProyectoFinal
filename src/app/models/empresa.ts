import { Puestos } from "./puestos";

export interface Empresa {

    id_empresa : number;
    nombre : string;
    url : string;
    telefono : number;
    direccion : string;
    contraseña : string;
    estado : boolean;
    puestos: Puestos[];
}
