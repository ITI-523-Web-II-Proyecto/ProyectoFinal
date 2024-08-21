import { Router } from "express";
import empresa  from "./empresa";
import persona from "./persona"
import certificados from "./certificados";
import puestos from "./puestos";

const routes = Router();

routes.use("/empresa", empresa)
routes.use("/persona",persona)
routes.use("/certificado", certificados)
routes.use("/puesto",puestos)

export default routes;