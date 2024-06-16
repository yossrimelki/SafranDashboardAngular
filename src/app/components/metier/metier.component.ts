import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Metier } from '../../models/metier';
import { MetierService } from '../../service/metier.service';
import { JwtService } from 'src/app/service/jwt.service';

@Component({
  selector: 'app-metier',
  templateUrl: './metier.component.html',
  styleUrls: ['./metier.component.css']
})
export class MetierComponent implements OnInit {
  metiers: Metier[];
  currentMetier: Metier = { id: null, title: '', description: '' }; 
  metierForm: FormGroup; 
  isNewMetier: boolean = true;

  pageSizeOptions: number[] = [5, 10, 20];
  currentPage: number = 0;
  itemsPerPage: number = 5;
  error: string = '';

  constructor(
    private fb: FormBuilder,
    private metierService: MetierService,
    private jwtService: JwtService
  ) { }

  ngOnInit(): void {
    if(!this.jwtService.isLoggedIn()){
      location.href = 'login';
    }
    this.initForm();
    this.loadMetiers();
  }

  initForm() {
    this.metierForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  loadMetiers() {
    this.metierService.getAllMetiers().subscribe(
        metiers => {
            this.metiers = metiers;
            console.log('Metiers:', this.metiers); // Add this line to check if data is received
        },
        error => console.error('Error fetching metiers: ', error)
    );
}

saveMetier() {
  const formValue = this.metierForm.value;
  const metier: Metier = {
    id: this.currentMetier.id,
    title: formValue.title,
    description: formValue.description
  };

  if (this.isNewMetier && this.isTitleExists(formValue.title)) {
    this.error = 'Title already exists';
    return;
  }

  if (this.isNewMetier) {
    this.metierService.createMetier(metier).subscribe(
      () => {
        this.loadMetiers();
        this.metierForm.reset(); // Reset form after adding metier
        this.isNewMetier = true;
      },
      error => console.error('Error adding metier: ', error)
    );
  } else {
    this.metierService.updateMetier(metier).subscribe(
      () => {
        this.loadMetiers();
        this.metierForm.reset(); // Reset form after updating metier
        this.isNewMetier = true;
      },
      error => console.error('Error updating metier: ', error)
    );
  }
}

clearError(): void {
  this.error = '';
}

isTitleExists(title: string): boolean {
  return this.metiers.some(metier => metier.title === title);
}

  editMetier(metier: Metier) {
    this.currentMetier = { ...metier }; // Clone the object to avoid changing the original
    this.metierForm.patchValue({
      title: metier.title,
      description: metier.description
    });
    this.isNewMetier = false;
  }

  deleteMetier(metierId: number) {
    this.metierService.deleteMetier(metierId).subscribe(
      () => {
        this.loadMetiers();
        this.currentMetier = { id: null, title: '', description: '' }; // Reset currentMetier
        this.isNewMetier = true;
        this.metierForm.reset(); // Reset form after deleting metier
      },
      error => console.error('Error deleting metier: ', error)
    );
  }

  paginate(event: any) {
    this.currentPage = event.pageIndex;
    this.itemsPerPage = event.pageSize;
  }

}
