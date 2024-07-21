import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { validate } from "class-validator";
import { Empresa } from "../entity/Empresa";

class EmpresaController {
    static create = async (req: Request, resp: Response) => {
        const empresaRepository = AppDataSource.getRepository(Empresa);

        try {
            // Destructuring
            const { id_empresa, nombre, url, telefono, direccion, contraseña } = req.body;

            // Validar si la empresa ya existe según el id_empresa
            let empresa = await empresaRepository.findOne({ where: { id_empresa } });
            if (empresa) {
                return resp.status(400).json({ message: "Esa empresa ya está registrada" });
            }

            // Instancia de Empresa
            empresa = new Empresa();
            empresa.id_empresa = id_empresa;
            empresa.nombre = nombre;
            empresa.url = url;
            empresa.telefono = telefono;
            empresa.direccion = direccion;
            empresa.contraseña = contraseña;

            // Validaciones con Class Validator
            const errors = await validate(empresa, { validationError: { target: false, value: false } });
            if (errors.length > 0) {
                return resp.status(400).json(errors);
            }

            // Guardar la empresa en la base de datos
            await empresaRepository.save(empresa);

            return resp.status(200).json("EMPRESA GUARDADA CORRECTAMENTE");
        } catch (error) {
            return resp.status(400).json({ message: "Error al guardar la empresa." });
        }
    }

    static getOne = async (req: Request, resp: Response) => {
        try {
            const id_empresa = req.params['id_empresa'];

            if (!id_empresa) {
                return resp.status(400).json({ message: "Debe indicar el ID de la empresa" });
            }

            const repo = AppDataSource.getRepository(Empresa);

            try {
                const empresa = await repo.findOneOrFail({ where: { id_empresa } });

                return resp.status(200).json(empresa);
            } catch (error) {
                return resp.status(404).json({ message: "La empresa no existe en la base de datos" });
            }

        } catch (error) {
            return resp.status(500).json({ message: "Error interno del servidor" });
        }
    }

}

export default EmpresaController;
