import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from './service/user.service';


@Component({
  selector: 'app-verificar-email',
  templateUrl: './verificar-email.component.html',
  styleUrl: './verificar-email.component.css'
})
export class VerificarEmailComponent {

  verifyForm: FormGroup;
  isSubmitted = false;
  successMessage: string = '';
  errorMessage: string = '';


  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    // Criando o formulário de verificação
    this.verifyForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      codigo: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Método para enviar a verificação ao backend
  onSubmit() {
    this.isSubmitted = true;

    // Se o formulário for inválido, não faz nada
    if (this.verifyForm.invalid) {
      return;
    }

    const { email, codigo } = this.verifyForm.value;

    // Chama o método do serviço para validar o código
    this.userService.verificarCodigo(email, codigo).subscribe(
      (response) => {
        this.successMessage = response.message;
        this.errorMessage = ''; // Limpa mensagens de erro
        // Navegar para outra página ou login após verificação bem-sucedida
        this.router.navigate(['/login']); // Exemplo: redireciona para a tela de login
      },
      (error) => {
        this.errorMessage = error.error.message;
        this.successMessage = ''; // Limpa mensagens de sucesso
      }
    );
  }



}
