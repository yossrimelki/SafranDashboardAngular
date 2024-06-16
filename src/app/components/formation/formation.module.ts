import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule here
import { FormationComponent } from './formation.component';
import { FormationService } from '../../service/formation.service';
import { ProgramFService } from '../../service/program-f.service'; // Import ProgramFService

@NgModule({
  declarations: [
    FormationComponent,
  ],
  imports: [
    CommonModule,
    FormsModule, // Add FormsModule to the imports array
  ],
  providers: [FormationService, ProgramFService], // Provide ProgramFService here
  exports: [FormationComponent]
})
export class FormationModule { }
