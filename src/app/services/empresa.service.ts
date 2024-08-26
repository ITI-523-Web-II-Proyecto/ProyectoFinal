import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Empresa } from '../models/empresa';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private apiUrl = 'http://localhost:3000/empresa'; 

  constructor(private http: HttpClient) { }

  // Método para crear una nueva empresa
  createEmpresa(empresa: Empresa): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, empresa);
  }

  // Método para obtener todas las empresas
  getEmpresa(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(`${this.apiUrl}`);
  }

  // Método para obtener una empresa por su ID
  getEmpresaById(id: number): Observable<Empresa> {
    return this.http.get<Empresa>(`${this.apiUrl}/${id}`);
  }

  // Método para actualizar una empresa existente
  updateEmpresa(empresa: Empresa): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${empresa.id_empresa}`, empresa);
  }

  // Método para eliminar una empresa por su ID
  deleteEmpresa(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
