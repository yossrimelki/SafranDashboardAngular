import { Component, OnInit } from '@angular/core';
import { ProgramFService } from '../../service/program-f.service';
import { ProgramF } from '../../models/program-f';
import { JwtService } from 'src/app/service/jwt.service';

@Component({
  selector: 'app-program-f',
  templateUrl: './ProgramF.component.html',
  styleUrls: ['./ProgramF.component.css']
})
export class ProgramFComponent implements OnInit {
  programs: ProgramF[] = [];
  newProgram: ProgramF = { title: '', description: '',formations:[] }; // New program object
  editingProgram: ProgramF | null = null; // Program being edited
  error: string = '';

  constructor(private programFService: ProgramFService ,private jwtService: JwtService ) { }

  ngOnInit(): void {
    if(!this.jwtService.isLoggedIn()){
      location.href = 'login'
    }
    this.loadPrograms();
  }

  loadPrograms(): void {
    this.programFService.getPrograms()
      .subscribe(
        programs => this.programs = programs,
        error => console.error('An error occurred while loading programs:', error)
      );
  }

  deleteProgram(program: ProgramF): void {
    console.log('Deleting program:', program);
    
    if (program.id !== undefined) {
      console.log('Deleting program with ID:', program.id);
      this.programFService.removeProgram(program.id)
        .subscribe(
          () => {
            console.log('Program deleted successfully');
            this.loadPrograms(); // Refresh the list after deletion
          },
          error => {
            console.error('An error occurred while deleting program:', error);
          }
        );
    } else {
      console.error('Program ID is undefined');
    }
  }

  addProgram(): void {
    if (this.isTitleExists(this.newProgram.title)) {
      this.error = 'Title already exists';
      return;
    }

    // Call the service to add the new program
    this.programFService.addProgram(this.newProgram)
      .subscribe(
        () => {
          // After adding the program, reload the list of programs
          this.loadPrograms();
          // Clear the new program object to reset the form
          this.newProgram = { title: '', description: '' ,formations:[]};
          // Reset error message
          this.error = '';
        },
        error => console.error('An error occurred while adding program:', error)
      );
  }

  isTitleExists(title: string): boolean {
    return this.programs.some(program => program.title === title);
  }

  editProgram(program: ProgramF): void {
    // Set the editingProgram to the program being edited
    this.editingProgram = { ...program }; // Creating a copy to avoid modifying the original object directly
  }

  saveEditedProgram(): void {
    if (this.editingProgram) {
      // Call the service to update the program
      this.programFService.modifyProgram(this.editingProgram)
        .subscribe(
          () => {
            // After saving the changes, reload the list of programs
            this.loadPrograms();
            // Clear the editingProgram to exit edit mode
            this.editingProgram = null;
          },
          error => console.error('An error occurred while saving edited program:', error)
        );
    }
  }
  clearError(): void {
    this.error = '';
  }
  
  cancelEdit(): void {
    // Clear the editingProgram to exit edit mode without saving changes
    this.editingProgram = null;
  }
}
