import { Router } from "express";
import PersonaController from "../controller/PersonaController";

const routes = Router();

routes.post("", PersonaController.create)
routes.get("/:id_persona",PersonaController.getOne)
routes.put("/:id_persona", PersonaController.update)
routes.get("",PersonaController.getAll)
routes.delete("/:id_persona", PersonaController.delete)

export default routes;