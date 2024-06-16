import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { ProgramFComponent } from './ProgramF.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [
    ProgramFComponent
  ],
  bootstrap: [
    ProgramFComponent
  ]
})
export class ProgramFModule { }