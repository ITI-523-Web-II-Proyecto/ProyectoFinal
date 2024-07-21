import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { validate } from "class-validator";
import { Persona } from "../entity/Persona";

class PersonaController {
    static create = async (req: Request, resp: Response) => {
        const personaRepository = AppDataSource.getRepository(Persona);

        try {
            // Destructuring
            const { id_persona, nombre, email, telefono, contraseña } = req.body;

            // Validar si la persona ya existe según el id_persona
            let persona = await personaRepository.findOne({ where: { id_persona } });
            if (persona) {
                return resp.status(400).json({ message: "Esa persona ya está registrada" });
            }

            // Instancia de Persona
            persona = new Persona();
            persona.id_persona = id_persona;
            persona.nombre = nombre;
            persona.email = email;
            persona.telefono = telefono;
            persona.contraseña = contraseña;

            // Validaciones con Class Validator
            const errors = await validate(persona, { validationError: { target: false, value: false } });
            if (errors.length > 0) {
                return resp.status(400).json(errors);
            }

            // Guardar la persona en la base de datos
            await personaRepository.save(persona);

            return resp.status(200).json("PERSONA GUARDADA CORRECTAMENTE");
        } catch (error) {
            return resp.status(400).json({ message: "Error al guardar la persona." });
        }
    }

    static getOne = async (req: Request, resp: Response) => {
        try {
            const id_persona = req.params['id_persona'];

            if (!id_persona) {
                return resp.status(400).json({ message: "Debe indicar el ID de la persona" });
            }

            const repo = AppDataSource.getRepository(Persona);

            try {
                const persona = await repo.findOneOrFail({ where: { id_persona } });

                return resp.status(200).json(persona);
            } catch (error) {
                return resp.status(404).json({ message: "La persona no existe en la base de datos" });
            }

        } catch (error) {
            return resp.status(500).json({ message: "Error interno del servidor" });
        }
    }
}

export default PersonaController;
