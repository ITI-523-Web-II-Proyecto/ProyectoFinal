import { Router } from "express";
import PersonaController from "../controller/PersonaController";

const routes = Router();

routes.post("", PersonaController.create)
routes.get("/:id_persona",PersonaController.getOne)

export default routes;