import { Component, OnInit } from '@angular/core';
import { EventoService } from './evento/evento.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.css'
})
export class EventosComponent implements OnInit {
  reservasUsuario: any = []; // Guarda as reservas do usuário
  eventos: any[] = []; // Lista de eventos (se necessário)

  cpf_usuario = localStorage.getItem('cpf');
  constructor(private eventoService: EventoService) { }


  ngOnInit(): void {
    // Obtém o CPF do localStorage e busca as reservas do usuário

    if (this.cpf_usuario) {
      this.eventoService.obterReservasUsuario(this.cpf_usuario).subscribe(reservas => {
        this.reservasUsuario = reservas;
        console.log('Reservas do usuário:', reservas);
      });
    }
    this.eventoService.getEventos().subscribe(eventos => {
      this.eventos = eventos;
      console.log('Eventos carregados:', eventos);
    });
  }


  reservar(evento: any, num_reservas: any): void {
    // Chama o serviço para reservar ingressos
    if(this.cpf_usuario){
    console.log('teste')
    this.eventoService.obterReservasUsuario(this.cpf_usuario).forEach(element => {
      console.log(element)
    });
    this.eventoService.obterReservasUsuario(this.cpf_usuario)

    this.eventoService.reservarIngressos(evento.id_evento, num_reservas).subscribe(response => {
      console.log('Reserva realizada com sucesso:', response);

    });

  }
  }

  editarReserva(evento: any, num_reservas: number): void {
    const cpf_usuario = localStorage.getItem('cpf');
    if (!cpf_usuario) {
      alert('CPF não encontrado');
      return;
    }

    // Primeiro, deleta todas as reservas do usuário para o evento
    this.eventoService.deletarReservasECriarNova(cpf_usuario, evento.id_evento, num_reservas).subscribe(response => {
      console.log('Reserva atualizada:', response);
    });
  }


  receberCodigos(reserva: any) {
    

    // Gerar um código aleatório para a reserva
    const codigoAleatorio = this.gerarCodigoAleatorio();

    // Exibir o código no alerta
    window.alert(`Código de verificação para a reserva '${reserva.nome}': ${codigoAleatorio}`);
  }

  // Função para gerar um código aleatório
  gerarCodigoAleatorio() {
    const codigo = Math.random().toString(36).substr(2, 6).toUpperCase(); // Gera um código aleatório de 6 caracteres
    return codigo;
  }

}
