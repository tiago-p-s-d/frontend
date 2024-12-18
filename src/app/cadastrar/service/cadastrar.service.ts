import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CadastrarService {
  private apiUrl = '/api/usuarios/cadastrar';

  constructor(private http: HttpClient) {}

  // Método para cadastrar usuário
  cadastrarUsuario(userData: any): Observable<any> {
    return this.http.post(this.apiUrl, userData);
  }
}
