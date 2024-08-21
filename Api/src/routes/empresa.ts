import { Router } from "express";
import EmpresaController from "../controller/EmpresaController";

const routes = Router();

routes.post("", EmpresaController.create)
routes.get("/:id_empresa",EmpresaController.getOne)
routes.get("", EmpresaController.getAll)
routes.delete("/:id_empresa",EmpresaController.delete)
routes.put("/:id_empresa",EmpresaController.update)

export default routes;