import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = '/api/usuarios/validar-codigo'
  constructor(private http: HttpClient) { }

  // Método para enviar o e-mail e código para validação
  verificarCodigo(email: string, codigo: string): Observable<any> {
    const body = { email, codigo };
    return this.http.post<any>(`${this.apiUrl}`, body);
  }
}
