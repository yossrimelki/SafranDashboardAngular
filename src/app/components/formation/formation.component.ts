  import { Component, OnInit } from '@angular/core';
  import { FormationService } from '../../service/formation.service';
  import { ProgramFService } from '../../service/program-f.service';
  import { MetierService } from '../../service/metier.service';
  import { Formation } from '../../models/formation';
  import { ProgramF } from '../../models/program-f';
  import { Metier } from '../../models/metier'; // Import Metier model
  import { JwtService } from 'src/app/service/jwt.service';

  @Component({
    selector: 'app-formation',
    templateUrl: './formation.component.html',
    styleUrls: ['./formation.component.css']
  })
  export class FormationComponent implements OnInit {
    formations: Formation[] = [];
    programFs: ProgramF[] = [];
    metiers: Metier[] = []; // Array to store all metiers
    newFormation: Formation = { ecole: '', title: '', fabrication: '', critereQualite: '', programF: null, metiers: [] };
    editingIndex: number | null = null;

    constructor(
      private formationService: FormationService,
      private programService: ProgramFService,
      private metierService: MetierService, // Inject MetierService
      private jwtService: JwtService
    ) {}

    ngOnInit(): void {
      if (!this.jwtService.isLoggedIn()) {
        location.href = 'login';
      }
      this.loadFormations();
      this.loadProgramFs();
      this.loadMetiers(); // Load metiers
    }
    isMetierSelected1(metier: Metier): boolean {
      // Check if the current metier is selected in newFormation
      return this.newFormation.metiers.some(m => m.id === metier.id);
    }
    isMetierSelected(metier: Metier, formation: Formation): boolean {
      return formation.metiers.some(m => m.id === metier.id);
    }
    

    // Function to handle metier selection
    toggleMetierSelection(metier: Metier): void {
      const index = this.newFormation.metiers.findIndex(m => m.id === metier.id);
      if (index !== -1) {
        // If metier is already selected, remove it
        this.newFormation.metiers.splice(index, 1);
      } else {
        // If not selected, add it
        this.newFormation.metiers.push(metier);
      }
    }
    loadFormations(): void {
      this.formationService.getFormations().subscribe(formations => this.formations = formations);
    }

    loadProgramFs(): void {
      this.programService.getPrograms().subscribe(programFs => this.programFs = programFs);
    }

    loadMetiers(): void {
      this.metierService.getAllMetiers().subscribe(metiers => this.metiers = metiers);
    }

    deleteFormation(formation: Formation): void {
      this.formationService.removeFormation(formation.id).subscribe(() => this.loadFormations());
    }

    addFormation(): void {
      this.formationService.addFormation(this.newFormation).subscribe(() => {
        this.loadFormations();
        this.newFormation = { ecole: '', title: '', fabrication: '', critereQualite: '', programF: null, metiers: [] }; // Reset newFormation after adding
      });
    }

    editFormation(index: number): void {
      this.editingIndex = index;
    }

    saveEditedFormation(formation: Formation): void {
      this.formationService.modifyFormation(formation).subscribe(() => {
        this.loadFormations();
        this.editingIndex = null;
      });
    }

    cancelEdit(): void {
      this.editingIndex = null;
    }

    trackById(index: number, item: any): number {
      return item.id;
    }

    // Function to check if a metier is selected in newFormation
    
  }
