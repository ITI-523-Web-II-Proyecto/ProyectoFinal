import { Empresa } from "./empresa";

export interface Puestos {
    id_puesto: number;
    nombrePuesto: string;
    descripcion: string;
    tiempoContratacion: string;
    requisitos: string;
    estado: boolean;
    empresa: Empresa;
}



