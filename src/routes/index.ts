import { Router } from "express";
import empresa  from "./empresa";
import persona from "./persona"
import certificados from "./certificados";
import puestos from "./puestos";

const routes = Router();

routes.use("/Empresa", empresa)
routes.use("/Persona",persona)
routes.use("/Certificado", certificados)
routes.use("/Puesto",puestos)

export default routes;