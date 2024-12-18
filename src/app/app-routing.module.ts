import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EventosComponent } from './eventos/eventos.component';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { VerificarEmailComponent } from './verificar-email/verificar-email.component';

const routes: Routes = [

  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'eventos', component: EventosComponent },
  { path: 'cadastrar', component: CadastrarComponent },
  { path: 'verificar-email', component: VerificarEmailComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
