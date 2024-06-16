import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProgramFComponent } from './components/ProgramF/ProgramF.component';
import { FormationComponent } from './components/formation/formation.component';
import { MetierComponent } from './components/metier/metier.component';
import { GrillePolyvalenceComponent } from './components/grille-polyvalence/grille-polyvalence.component';
import { LoginGuard } from './service/login.guard'; // Import LoginGuard
import { UserTableComponent } from './user-table-component/user-table-component.component';

const routes: Routes = [
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent, canActivate: [LoginGuard] }, // Use LoginGuard here
  { path: "dashboard", component: DashboardComponent },
  { path: "program", component: ProgramFComponent },
  { path: "formation", component: FormationComponent },
  { path: "metier", component: MetierComponent },
  { path: "grillepolyvalence", component: GrillePolyvalenceComponent },
  { path: "users", component: UserTableComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
