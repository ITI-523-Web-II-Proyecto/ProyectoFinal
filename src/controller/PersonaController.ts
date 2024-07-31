import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Persona } from "../entity/Persona";
import { Certificado } from "../entity/Certificado";
import { ValidationError, validate } from "class-validator";

class PersonaController {

    static getAll = async (req: Request, res: Response) => {
        try {
            const repo = AppDataSource.getRepository(Persona);
            const listaPersonas = await repo.find({ where: { estado: true }, relations: { certificados: true } });

            if (listaPersonas.length == 0) {
                return res.status(404).json({ message: "No hay datos registrados." });
            }
            return res.status(200).json(listaPersonas);
        } catch (error) {
            return res.status(400).json({ message: "Error al acceder a la base de datos." });
        }
    }

    static create = async (req: Request, res: Response) => {
        const { id_persona, nombre, email, telefono, contraseña } = req.body;
        const repoPersona = AppDataSource.getRepository(Persona);

        try {
            let persona = await repoPersona.findOne({ where: { id_persona } });
            if (persona) {
                return res.status(400).json({ message: "Esa persona ya existe en la base de datos." });
            }

            persona = new Persona();
            persona.id_persona = id_persona;
            persona.nombre = nombre;
            persona.email = email;
            persona.telefono = telefono;
            persona.contraseña = contraseña;
            persona.estado = true;

            const errors = await validate(persona, { validationError: { target: false, value: false } });
            if (errors.length > 0) {
                return res.status(400).json(errors);
            }

            await repoPersona.save(persona);
        } catch (error) {
            return res.status(400).json({ message: "Error al guardar." });
        }
        return res.status(200).json("Persona guardada correctamente.");
    }

    static getOne = async (req: Request, res: Response) => {
        try {
            const id_persona = req.params['id_persona'];
            const repo = AppDataSource.getRepository(Persona);
    
            try {
                const persona = await repo.findOneOrFail({
                    where: { id_persona, estado: true },
                    relations: { certificados: true }
                });
    
                // Filtrar los certificados que tienen estado verdadero
                persona.certificados = persona.certificados.filter(certificado => certificado.estado);
    
                return res.status(200).json(persona);
            } catch (error) {
                return res.status(404).json({ message: "La persona con el ID indicado no existe en la base de datos." });
            }
        } catch (error) {
            return res.status(404).json({ message: "La persona con el ID indicado no existe en la base de datos." });
        }
    }
    

    static update = async (req: Request, res: Response) => {
        const { nombre, email, telefono, contraseña, estado } = req.body;

        try {
            const id_persona = req.params['id_persona'];
            const repo = AppDataSource.getRepository(Persona);

            let persona;
            try {
                persona = await repo.findOneOrFail({ where: { id_persona } });
            } catch (error) {
                return res.status(404).json({ message: "La persona con el ID indicado no existe en la base de datos." });
            }

            // Actualiza los campos de la persona
            persona.nombre = nombre;
            persona.email = email;
            persona.telefono = telefono;
            persona.contraseña = contraseña;
            // Actualiza el estado de la persona
            persona.estado = estado !== undefined ? estado : persona.estado;

            // Validación de datos
            const errors = await validate(persona, { validationError: { target: false, value: false } });
            if (errors.length > 0) {
                return res.status(400).json(errors);
            }

            // Guarda la persona actualizada
            await repo.save(persona);
            return res.status(200).json({ message: "La persona ha sido modificada." });

        } catch (error) {
            return res.status(404).json({ message: "Error al actualizar la persona." });
        }
    }
    static delete = async (req: Request, res: Response) => {
        try {
            const id_persona = req.params['id_persona'];
            const repo = AppDataSource.getRepository(Persona);

            let persona;
            try {
                persona = await repo.findOneOrFail({ where: { id_persona } });
            } catch (error) {
                return res.status(404).json({ message: "La persona con el ID indicado no existe en la base de datos." });
            }

            persona.estado = false;
            await repo.save(persona);
            return res.status(200).json({ message: "La persona ha sido eliminada." });

        } catch (error) {
            return res.status(404).json({ message: "Error al eliminar la persona." });
        }
    }
}

export default PersonaController;
