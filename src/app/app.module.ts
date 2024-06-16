import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JwtService } from './service/jwt.service'; // Import JwtService
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProgramFModule } from './components/ProgramF/ProgramF.module';
import { FormationModule } from './components/formation/formation.module';
import { MetierComponent } from './components/metier/metier.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { StarRatingModule } from 'angular-star-rating';
import { MatPaginatorModule } from '@angular/material/paginator'; // Add this line
import { GrillePolyvalenceComponent } from './components/grille-polyvalence/grille-polyvalence.component';
import { FormsModule } from '@angular/forms';
import { UserTableComponent } from './user-table-component/user-table-component.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    MetierComponent,
    SidebarComponent,
    GrillePolyvalenceComponent,
    UserTableComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    StarRatingModule,
    ProgramFModule,
    FormationModule,
    MatPaginatorModule // Add MatPaginatorModule here
  ],
  providers: [JwtService], // Provide JwtService here
  bootstrap: [AppComponent]
})
export class AppModule { }
