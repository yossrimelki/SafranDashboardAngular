import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { GrillePolyvalence } from '../../models/GrillePolyvalence ';
import { GrillePolyvalenceService } from '../../service/GrillePolyvalence.service ';
import { JwtService } from 'src/app/service/jwt.service';
import { MetierService } from 'src/app/service/metier.service';
import { UserService } from 'src/app/service/UserService';
import { ProgramFService } from 'src/app/service/program-f.service';
import { FormationService } from 'src/app/service/formation.service';
import { Formation } from '../../models/formation';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-grille-polyvalence',
  templateUrl: './grille-polyvalence.component.html'
})
export class GrillePolyvalenceComponent implements OnInit {
  
  grillePolyvalences: GrillePolyvalence[] = [];
  filteredGrillePolyvalences: GrillePolyvalence[] = [];
  metiers: any[] = [];
  users: any[] = [];
  filteredUsers: any[] = [];
  programs: any[] = [];
  formations: any[] = [];
  filteredFormations: Formation[] = [];
  selectedProgramId: number;
  selectedFormationId: number;
  newGrillePolyvalenceForm: FormGroup;
  errorMessage: string;
  selectedFile: File | null = null;

  constructor(
    private grillePolyvalenceService: GrillePolyvalenceService,
    private jwtService: JwtService,
    private formBuilder: FormBuilder,
    private metierService: MetierService,
    private userService: UserService,
    private programService: ProgramFService,
    private formationService: FormationService
  ) {
    this.newGrillePolyvalenceForm = this.formBuilder.group({
      userId: ['', Validators.required],
      metierId: ['', Validators.required],
      niveau: ['', Validators.required],
      userSearch: [''],
      file: [null]
    });
  }

  ngOnInit(): void {
    if (!this.jwtService.isLoggedIn()) {
      location.href = 'login';
    }
    this.getAllFormationsByProgram(this.selectedProgramId);
    this.getAllGrillePolyvalences();
    this.getAllMetiers();
    this.getAllUsers().subscribe((users: any[]) => {
      this.users = users;
      this.filteredUsers = users;
    });
    this.getAllPrograms();
  }

  get userSearchControl(): FormControl {
    return this.newGrillePolyvalenceForm.get('userSearch') as FormControl;
  }

  filterUsers(event: any): void {
    const searchTerm = event.target.value.toUpperCase();
    console.log('Search term:', searchTerm);
    if (searchTerm) {
      this.filteredUsers = this.users.filter(user =>
        user.aleas && user.aleas.toUpperCase().includes(searchTerm)
      );
    } else {
      this.filteredUsers = this.users;
    }
    console.log('Filtered Users:', this.filteredUsers);
    const filteredUserIds = this.filteredUsers.map(user => user.id);
    this.fetchGrillePolyvalencesByUserId(filteredUserIds[0]);
  }

  fetchGrillePolyvalencesByUserId(userId: number): void {
    this.grillePolyvalenceService.getGrillePolyvalencesByUserId(userId)
      .subscribe((data: GrillePolyvalence[]) => {
        this.grillePolyvalences = data;
        this.updateFilteredGrillePolyvalences();
      });
  }


  updateFilteredGrillePolyvalences(): void {
    const filteredUserIds = this.filteredUsers.map(user => user.id);
    this.filteredGrillePolyvalences = this.grillePolyvalences.filter(grille =>
      filteredUserIds.includes(grille.user.id)
    );
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  getAllPrograms(): void {
    this.programService.getPrograms().subscribe(
      (programs: any[]) => {
        this.programs = programs;
      },
      error => {
        console.error('Error fetching programs: ', error);
      }
    );
  }

  onMetierChange(event: Event): void {
    const selectedMetierId = (event.target as HTMLSelectElement).value;
    this.fetchDataByMetier(Number(selectedMetierId));
  }

  fetchDataByMetier(metierId: number): void {
    this.grillePolyvalenceService.getGrillePolyvalencesByMetierId(metierId)
      .subscribe((data: GrillePolyvalence[]) => {
        this.grillePolyvalences = data;
        this.updateFilteredGrillePolyvalences();
      });
  }

  onProgramChange(event: Event): void {
    const selectedProgramId = (event.target as HTMLSelectElement).value;
    this.selectedProgramId = Number(selectedProgramId);
    if (this.selectedProgramId) {
      this.getAllFormationsByProgram(this.selectedProgramId);
    }
  }

  onFormationChange(selectedValue: any): void {
    this.selectedFormationId = Number(selectedValue);
  }

  getAllFormationsByProgram(programId: number): void {
    this.formationService.getAllFormationsByProgram(programId)
      .subscribe(
        (formations: Formation[]) => {
          this.filteredFormations = formations;
        },
        error => {
          this.errorMessage = 'An error occurred: ' + error.message;
        }
      );
  }

  getAllUsers(): Observable<any[]> {
    return this.userService.getUsersUsernameAleasAndRole();
  }

  getAllMetiers(): void {
    this.metierService.getAllMetiers().subscribe(
      (metiers: any[]) => {
        this.metiers = metiers;
      },
      error => {
        console.error('Error fetching metiers: ', error);
      }
    );
  }

  getAllGrillePolyvalences(): void {
    this.grillePolyvalenceService.getAllGrillePolyvalences()
      .subscribe((data: GrillePolyvalence[]) => {
        this.grillePolyvalences = data;
        this.updateFilteredGrillePolyvalences();
      });
  }

  getGrillePolyvalenceById(grillePolyvalenceId: number): void {
    this.grillePolyvalenceService.getGrillePolyvalenceById(grillePolyvalenceId)
      .subscribe((data: GrillePolyvalence) => {
        console.log(data);
      });
  }

  addGrillePolyvalence(): void {
    const formData = new FormData();
    formData.append('grillePolyvalenceDTO', JSON.stringify({
      userId: this.newGrillePolyvalenceForm.value.userId,
      metierId: this.newGrillePolyvalenceForm.value.metierId,
      niveau: this.newGrillePolyvalenceForm.value.niveau
    }));
    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    }

    this.grillePolyvalenceService.addGrillePolyvalence(formData)
      .subscribe(
        (data: any) => {
          console.log("Response from server:", data);
          this.getAllGrillePolyvalences();
          this.newGrillePolyvalenceForm.reset();
        },
        (error) => {
          console.error("Error adding grille polyvalence:", error);
        }
      );
  }

  updateGrillePolyvalence(grillePolyvalence: GrillePolyvalence): void {
    this.grillePolyvalenceService.updateGrillePolyvalence(grillePolyvalence)
      .subscribe((data: GrillePolyvalence) => {
        console.log(data);
      });
  }

  deleteGrillePolyvalence(grillePolyvalenceId: number): void {
    this.grillePolyvalenceService.deleteGrillePolyvalence(grillePolyvalenceId)
      .subscribe(() => {
        console.log('Deleted successfully');
        this.getAllGrillePolyvalences();
      });
  }
}
