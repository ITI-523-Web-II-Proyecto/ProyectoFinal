import { Router } from "express";
import PuestoController from "../controller/PuestoController";

const routes = Router();

routes.post("", PuestoController.create)
routes.get("/:id_puesto",PuestoController.getOne)
routes.get("", PuestoController.getAll)
routes.delete("/:id_puesto",PuestoController.delete)
routes.put("/:id_puesto",PuestoController.update)

export default routes;