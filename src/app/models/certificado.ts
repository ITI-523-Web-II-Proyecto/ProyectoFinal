import { Persona } from "./persona";

export interface Certificado {
  id_certificado: string;
  descripcion: string;
  categoria: string;
  institucion: string;
  'año': number;
  estado: boolean;
  persona: Persona;
}

