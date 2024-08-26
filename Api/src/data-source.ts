import "reflect-metadata"
import { DataSource } from "typeorm"
import { Persona } from "./entity/Persona"
import { Empresa } from "./entity/Empresa"
import { Certificado } from "./entity/Certificado"
import { Puesto } from "./entity/Puesto"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "apiPro",
    synchronize: false,
    logging: false,
    entities: [Persona,Empresa,Certificado,Puesto],
    migrations: [],
    subscribers: [],
})
