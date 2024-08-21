import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Puesto } from "../entity/Puesto";
import { Empresa } from "../entity/Empresa";
import { validate } from "class-validator";

class PuestosController {

    static getAll = async (req: Request, res: Response) => {
        try {
            const repo = AppDataSource.getRepository(Puesto);
            const listaPuestos = await repo.find({ where: { estado: true }, relations: { empresa: true } });

            if (listaPuestos.length == 0) {
                return res.status(404).json({ message: "No hay datos registrados." });
            }
            return res.status(200).json(listaPuestos);
        } catch (error) {
            return res.status(400).json({ message: "Error al acceder a la base de datos." });
        }
    }

    static create = async (req: Request, res: Response) => {
        const { nombrePuesto, descripcion, tiempoContratacion, requisitos, empresaId } = req.body;
        const repoPuesto = AppDataSource.getRepository(Puesto);

        try {
            let puesto = new Puesto();
            puesto.nombrePuesto = nombrePuesto;
            puesto.descripcion = descripcion;
            puesto.tiempoContratacion = tiempoContratacion;
            puesto.requisitos = requisitos;
            puesto.estado = true;

            const validateOpt = { validationError: { target: false, value: false } };
            const errors = await validate(puesto, validateOpt);

            if (errors.length > 0) {
                return res.status(400).json(errors);
            }

            const repoEmpresa = AppDataSource.getRepository(Empresa);
            let empresa;
            try {
                empresa = await repoEmpresa.findOneOrFail({ where: { id_empresa: empresaId, estado: true } });
            } catch (error) {
                return res.status(400).json({ message: "No existe la empresa." });
            }

            puesto.empresa = empresa;
            await repoPuesto.save(puesto);

            return res.status(200).json("Puesto guardado correctamente.");
        } catch (error) {
            return res.status(400).json({ message: "Error al guardar." });
        }
    }

    static getOne = async (req: Request, res: Response) => {
        try {
            const id_puesto = parseInt(req.params['id_puesto']);
            const repo = AppDataSource.getRepository(Puesto);

            try {
                const puesto = await repo.findOneOrFail({ where: { id_puesto, estado: true }, relations: { empresa: true } });
                return res.status(200).json(puesto);
            } catch (error) {
                return res.status(404).json({ message: "El puesto con el ID indicado no existe en la base de datos." });
            }
        } catch (error) {
            return res.status(404).json({ message: "El puesto con el ID indicado no existe en la base de datos." });
        }
    }

    static update = async (req: Request, res: Response) => {
        const { nombrePuesto, descripcion, tiempoContratacion, requisitos, empresaId, estado } = req.body;

        try {
            const id_puesto = parseInt(req.params['id_puesto']);
            const repo = AppDataSource.getRepository(Puesto);

            let puesto;
            try {
                puesto = await repo.findOneOrFail({ where: { id_puesto } });
            } catch (error) {
                return res.status(404).json({ message: "El puesto con el ID indicado no existe en la base de datos." });
            }

            // Actualiza los campos del puesto
            puesto.nombrePuesto = nombrePuesto;
            puesto.descripcion = descripcion;
            puesto.tiempoContratacion = tiempoContratacion;
            puesto.requisitos = requisitos;
            // Actualiza el estado del puesto
            puesto.estado = estado !== undefined ? estado : puesto.estado;

            // Validación de datos
            const errors = await validate(puesto, { validationError: { target: false, value: false } });
            if (errors.length > 0) {
                return res.status(400).json(errors);
            }

            // Validación de la empresa
            const repoEmpresa = AppDataSource.getRepository(Empresa);
            let empresa;
            try {
                empresa = await repoEmpresa.findOneOrFail({ where: { id_empresa: empresaId } });
            } catch (ex) {
                return res.status(400).json({ message: "No existe la empresa indicada." });
            }
            puesto.empresa = empresa;

            // Guarda el puesto actualizado
            await repo.save(puesto);
            return res.status(200).json({ message: "El puesto ha sido modificado." });

        } catch (error) {
            return res.status(404).json({ message: "Error al actualizar el puesto." });
        }
    }

    static delete = async (req: Request, res: Response) => {
        try {
            const id_puesto = parseInt(req.params['id_puesto']);
            const repo = AppDataSource.getRepository(Puesto);

            let puesto;
            try {
                puesto = await repo.findOneOrFail({ where: { id_puesto, estado: true } });
            } catch (error) {
                return res.status(404).json({ message: "El puesto con el ID indicado no existe en la base de datos." });
            }

            puesto.estado = false;
            await repo.save(puesto);
            return res.status(200).json({ message: "El puesto ha sido eliminado." });
        } catch (error) {
            return res.status(404).json({ message: "Error al eliminar el puesto." });
        }
    }
}

export default PuestosController;
