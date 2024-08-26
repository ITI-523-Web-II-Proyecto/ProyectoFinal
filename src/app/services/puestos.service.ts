import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Puestos } from '../models/puestos';

@Injectable({
  providedIn: 'root'
})
export class PuestosService {

  private apiUrl = 'http://localhost:3000/puesto'; 

  constructor(private http: HttpClient) { }

  getPuestos(): Observable<Puestos[]> {
    return this.http.get<Puestos[]>(`${this.apiUrl}`);
  }

  getPuestoById(id: number): Observable<Puestos> {
    return this.http.get<Puestos>(`${this.apiUrl}/${id}`);
  }

  createPuesto(puesto: Puestos): Observable<Puestos> {
    return this.http.post<Puestos>(this.apiUrl, puesto);
  }

  updatePuesto(id: number, puesto: Puestos): Observable<Puestos> {
    return this.http.put<Puestos>(`${this.apiUrl}/${id}`, puesto);
  }

  deletePuesto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
