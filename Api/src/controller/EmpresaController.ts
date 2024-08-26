import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Empresa } from "../entity/Empresa";
import { Puesto } from "../entity/Puesto";
import { ValidationError, validate } from "class-validator";

class EmpresasController {

    static getAll = async (req: Request, res: Response) => {
        try {
            const repo = AppDataSource.getRepository(Empresa);
            const listaEmpresas = await repo.find({ where: { estado: true }, relations: { puestos: true } });

            if (listaEmpresas.length == 0) {
                return res.status(404).json({ message: "No hay datos registrados." });
            }
            return res.status(200).json(listaEmpresas);
        } catch (error) {
            return res.status(400).json({ message: "Error al acceder a la base de datos." });
        }
    }

    static create = async (req: Request, res: Response) => {
        const { id_empresa, nombre, url, telefono, direccion, contraseña } = req.body;
        const repoEmpresa = AppDataSource.getRepository(Empresa);

        try {
            let empresa = await repoEmpresa.findOne({ where: { id_empresa } });
            if (empresa) {
                return res.status(400).json({ message: "Esa empresa ya existe en la base de datos." });
            }

            empresa = new Empresa();
            empresa.id_empresa = id_empresa;
            empresa.nombre = nombre;
            empresa.url = url;
            empresa.telefono = telefono;
            empresa.direccion = direccion;
            empresa.contraseña = contraseña;
            empresa.estado = true;

            const errors = await validate(empresa, { validationError: { target: false, value: false } });
            if (errors.length > 0) {
                return res.status(400).json(errors);
            }

            await repoEmpresa.save(empresa);
        } catch (error) {
            return res.status(400).json({ message: "Error al guardar." });
        }
        return res.status(200).json("Empresa guardada correctamente.");
    }

    static getOne = async (req: Request, res: Response) => {
        try {
            const id_empresa = req.params['id_empresa'];
            const repo = AppDataSource.getRepository(Empresa);
    
            try {
                const empresa = await repo.findOneOrFail({
                    where: { id_empresa, estado: true },
                    relations: { puestos: true }
                });
    
                // Filtrar los puestos que tienen estado verdadero
                empresa.puestos = empresa.puestos.filter(puesto => puesto.estado);
    
                return res.status(200).json(empresa);
            } catch (error) {
                return res.status(404).json({ message: "La empresa con el ID indicado no existe en la base de datos." });
            }
        } catch (error) {
            return res.status(404).json({ message: "La empresa con el ID indicado no existe en la base de datos." });
        }
    }
    

    static update = async (req: Request, res: Response) => {
        const { nombre, url, telefono, direccion, contraseña, estado } = req.body;

        try {
            const id_empresa = req.params['id_empresa'];
            const repo = AppDataSource.getRepository(Empresa);

            let empresa;
            try {
                empresa = await repo.findOneOrFail({ where: { id_empresa } });
            } catch (error) {
                return res.status(404).json({ message: "La empresa con el ID indicado no existe en la base de datos." });
            }

            // Actualiza los campos de la empresa
            empresa.nombre = nombre;
            empresa.url = url;
            empresa.telefono = telefono;
            empresa.direccion = direccion;
            empresa.contraseña = contraseña;
            // Actualiza el estado de la empresa
            empresa.estado = estado !== undefined ? estado : empresa.estado;

            // Validación de datos
            const errors = await validate(empresa, { validationError: { target: false, value: false } });
            if (errors.length > 0) {
                return res.status(400).json(errors);
            }

            // Guarda la empresa actualizada
            await repo.save(empresa);
            return res.status(200).json({ message: "La empresa ha sido modificada." });

        } catch (error) {
            return res.status(404).json({ message: "Error al actualizar la empresa." });
        }
    }

    static delete = async (req: Request, res: Response) => {
        try {
            const id_empresa = req.params['id_empresa'];
            const repo = AppDataSource.getRepository(Empresa);

            let empresa;
            try {
                empresa = await repo.findOneOrFail({ where: { id_empresa } });
            } catch (error) {
                return res.status(404).json({ message: "La empresa con el ID indicado no existe en la base de datos." });
            }

            empresa.estado = false;
            await repo.save(empresa);
            return res.status(200).json({ message: "La empresa ha sido eliminada." });

        } catch (error) {
            return res.status(404).json({ message: "Error al eliminar la empresa." });
        }
    }
}

export default EmpresasController;
