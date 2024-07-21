import { Router } from "express";
import empresa  from "./empresa";
import persona from "./persona"

const routes = Router();

routes.use("/Empresa", empresa)
routes.use("/Persona",persona)

export default routes;