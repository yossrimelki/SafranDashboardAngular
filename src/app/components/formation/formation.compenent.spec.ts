import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms'; // Add this line
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Add this line

import { FormationComponent } from './formation.component';
import { FormationService } from '../../service/formation.service';
import { ProgramFService } from '../../service/program-f.service';

describe('FormationComponent', () => {
  let component: FormationComponent;
  let fixture: ComponentFixture<FormationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormationComponent ],
      imports: [ FormsModule, HttpClientTestingModule ], // Add FormsModule and HttpClientTestingModule
      providers: [ FormationService, ProgramFService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
