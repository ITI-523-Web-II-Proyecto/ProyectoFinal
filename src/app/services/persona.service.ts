import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Persona } from '../models/persona';
import { Observable } from 'rxjs';
import { Certificado } from '../models/certificado';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private apiUrl = 'http://localhost:3000/persona';

  constructor(private http: HttpClient) { }

  // Método para crear una nueva persona
  createPersona(persona: Persona): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, persona);
  }

  // Método para obtener todas las personas
  getPersona(): Observable<Persona[]> {
    return this.http.get<Persona[]>(`${this.apiUrl}`);
  }

  // Método para obtener una persona por su ID
  getPersonaById(id: number): Observable<Persona> {
    return this.http.get<Persona>(`${this.apiUrl}/${id}`);
  }

  // Método para actualizar una persona existente
  updatePersona(persona: Persona): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${persona.id_persona}`, persona);
  }

  // Método para eliminar una persona por su ID
  deletePersona(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  crateCert(certificado:Certificado):Observable<any>{
    return this.http.post<any>("http://localhost:3000/certificado",certificado);
  }

  getAllCert(): Observable<Persona> {
    return this.http.get<any>("http://localhost:3000/certificado");
  }
}
