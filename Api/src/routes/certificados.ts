import { Router } from "express";
import CertificadoController from "../controller/CertificadoController";

const routes = Router();

routes.post("", CertificadoController.create)
routes.get("/:token",CertificadoController.getOne)
routes.get("", CertificadoController.getAll)
routes.delete("/:token",CertificadoController.delete)
routes.put("/:token",CertificadoController.update)

export default routes;