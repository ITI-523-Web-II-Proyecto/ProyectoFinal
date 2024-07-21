import { Router } from "express";
import EmpresaController from "../controller/EmpresaController";

const routes = Router();

routes.post("", EmpresaController.create)
routes.get("/:id_empresa",EmpresaController.getOne)

export default routes;