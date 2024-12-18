import { Component } from '@angular/core';
import { CadastrarService } from './service/cadastrar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrl: './cadastrar.component.css'
})
export class CadastrarComponent {
 // Objeto que armazena os dados do formulário
 usuario = {
  username: '',
  password: '',
  cpf: '',
  email: '',
};

mensagem: string = ''; // Mensagem de sucesso ou erro

constructor(private cadastrarService: CadastrarService, private router: Router) {}

// Método chamado no submit do formulário
onSubmit() {
  this.cadastrarService.cadastrarUsuario(this.usuario).subscribe({
    next: (response) => {
      this.mensagem = 'Usuário cadastrado com sucesso!';
      console.log(response);
    },
    error: (err) => {
      this.mensagem = err.error.message || 'Erro ao cadastrar usuário.';
      console.error(err);
    },
  });
  this.router.navigate(['/verificar-email']);
}

}
