import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Certificado } from "../entity/Certificado";
import { Persona } from "../entity/Persona";
import { ValidationError, validate } from "class-validator";

class CertificadoController {

    static getAll = async (req: Request, res: Response) => {
        try {
            const repo = AppDataSource.getRepository(Certificado);
            const listaCertificados = await repo.find({ where: { estado: true }, relations: { persona: true } });

            if (listaCertificados.length == 0) {
                return res.status(404).json({ message: "No hay datos registrados." });
            }
            return res.status(200).json(listaCertificados);
        } catch (error) {
            return res.status(400).json({ message: "Error al acceder a la base de datos." });
        }
    }

    static create = async (req: Request, res: Response) => {
        const { id_certificado, descripcion, categoria, institucion, año, personaId } = req.body;
        const repoCertificado = AppDataSource.getRepository(Certificado);

        try {
            let certificado = await repoCertificado.findOne({ where: { id_certificado } });
            if (certificado) {
                return res.status(400).json({ message: "Ese certificado ya existe en la base de datos." });
            }

            certificado = new Certificado();
            certificado.id_certificado = id_certificado;
            certificado.descripcion = descripcion;
            certificado.categoria = categoria;
            certificado.institucion = institucion;
            certificado.año = año;
            certificado.estado = true;

            const errors = await validate(certificado, { validationError: { target: false, value: false } });
            if (errors.length > 0) {
                return res.status(400).json(errors);
            }

            // Validación de la persona
            const repoPersona = AppDataSource.getRepository(Persona);
            let persona;
            try {
                persona = await repoPersona.findOneOrFail({ where: { id_persona: personaId } });
            } catch (ex) {
                return res.status(400).json({ message: "No existe la persona indicada." });
            }
            certificado.persona = persona;

            await repoCertificado.save(certificado);
        } catch (error) {
            return res.status(400).json({ message: "Error al guardar." });
        }
        return res.status(200).json("Certificado guardado correctamente.");
    }

    static getOne = async (req: Request, res: Response) => {
        try {
            const id_certificado = req.params['id_certificado'];
            const repo = AppDataSource.getRepository(Certificado);

            try {
                const certificado = await repo.findOneOrFail({ where: { id_certificado, estado: true }, relations: { persona: true } });
                return res.status(200).json(certificado);
            } catch (error) {
                return res.status(404).json({ message: "El certificado con el ID indicado no existe en la base de datos." });
            }

        } catch (error) {
            return res.status(404).json({ message: "El certificado con el ID indicado no existe en la base de datos." });
        }
    }

    static update = async (req: Request, res: Response) => {
        const { descripcion, categoria, institucion, año, personaId, estado } = req.body;

        try {
            const id_certificado = req.params['id_certificado'];
            const repo = AppDataSource.getRepository(Certificado);

            let certificado;
            try {
                certificado = await repo.findOneOrFail({ where: { id_certificado } });
            } catch (error) {
                return res.status(404).json({ message: "El certificado con el ID indicado no existe en la base de datos." });
            }

            // Actualiza los campos del certificado
            certificado.descripcion = descripcion;
            certificado.categoria = categoria;
            certificado.institucion = institucion;
            certificado.año = año;
            // Actualiza el estado del certificado
            certificado.estado = estado !== undefined ? estado : certificado.estado;

            // Validación de datos
            const errors = await validate(certificado, { validationError: { target: false, value: false } });
            if (errors.length > 0) {
                return res.status(400).json(errors);
            }

            // Validación de la persona
            const repoPersona = AppDataSource.getRepository(Persona);
            let persona;
            try {
                persona = await repoPersona.findOneOrFail({ where: { id_persona: personaId } });
            } catch (ex) {
                return res.status(400).json({ message: "No existe la persona indicada." });
            }
            certificado.persona = persona;

            // Guarda el certificado actualizado
            await repo.save(certificado);
            return res.status(200).json({ message: "El certificado ha sido modificado." });

        } catch (error) {
            return res.status(404).json({ message: "Error al actualizar el certificado." });
        }
    }

    static delete = async (req: Request, res: Response) => {
        try {
            const id_certificado = req.params['id_certificado'];
            const repo = AppDataSource.getRepository(Certificado);

            let certificado;
            try {
                certificado = await repo.findOneOrFail({ where: { id_certificado } });
            } catch (error) {
                return res.status(404).json({ message: "El certificado con el ID indicado no existe en la base de datos." });
            }

            certificado.estado = false;
            await repo.save(certificado);
            return res.status(200).json({ message: "El certificado ha sido eliminado." });

        } catch (error) {
            return res.status(404).json({ message: "Error al eliminar el certificado." });
        }
    }
}

export default CertificadoController;
