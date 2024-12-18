import { AuthService } from './auth/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {

        // Salva o CPF no localStorage
        const cpf = response.user.cpf;
        localStorage.setItem('cpf', cpf);

        this.router.navigate(['/eventos']);

        alert('Login realizado com sucesso!');
        // Redirecione ou continue o fluxo do aplicativo
      },
      error: (err) => {
        console.error('Erro no login:', err);
        this.errorMessage = err.error.error || 'Erro desconhecido';
      }
    });
  }

  cadastrar(){
    this.router.navigate(['/cadastrar']);
  }


}
