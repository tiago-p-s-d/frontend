import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  private apiUrl = '/api/eventos/'; // URL da API
  private reservarUrl = '/api/reservar/'; // URL da API
  private deletarUrl= '/api/reservar/deletar'; // URL da API

  constructor(private http: HttpClient) { }

  // Método para obter os eventos
  getEventos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Método para reservar ingressos com validação
  reservarIngressos(id_evento: number, num_reservas: number): Observable<any> {
    const cpf_usuario = localStorage.getItem('cpf'); // Obtém o CPF do localStorage
    if (!cpf_usuario) return of({ error: 'CPF não encontrado' });

    return this.obterReservasUsuario(cpf_usuario).pipe(
      catchError(err => of([])),
      switchMap(reservas => {
        const eventoReservas = reservas.find(res => res.id_evento === id_evento);
        const reservasAtual = eventoReservas ? eventoReservas.total_reservas : 0;
        const maxReservas = 3 - reservasAtual;

        if (num_reservas > maxReservas) {
          return of({ error: `Você pode reservar no máximo ${maxReservas} ingressos para este evento.` });
        }

        return this.http.post<any>(this.reservarUrl, { id_evento, cpf_usuario, num_reservas });
      })
    );
  }

  // Obtém as reservas do usuário
  obterReservasUsuario(cpf_usuario: string): Observable<any[]> {
    return this.http.post<any[]>(`${this.reservarUrl}soma`, { cpf_usuario });
  }


  deletarReservasECriarNova(cpf_usuario: string, id_evento: number, num_reservas: number): Observable<any> {
    const body = { cpf_usuario, id_evento };

    // Primeiro deleta as reservas
    return this.http.delete<any>(`${this.deletarUrl}`, { body }).pipe(
      catchError(err => {
        console.error('Erro ao deletar reservas:', err);
        return of({ error: 'Erro ao deletar reservas' });
      }),
      // Depois chama a função de reservar, independente do retorno da exclusão
      switchMap(() => this.reservarIngressos(id_evento, num_reservas))
    );




  }

  deletarReservas(cpf_usuario: string, id_evento: number): Observable<any> {
    const body = { cpf_usuario, id_evento };

    return this.http.delete<any>(`${this.deletarUrl}`, { body });
  }



}
