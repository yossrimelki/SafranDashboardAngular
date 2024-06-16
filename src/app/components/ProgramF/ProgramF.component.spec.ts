import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgramFComponent } from './ProgramF.component';
import { ProgramFService } from '../../service/program-f.service';
import { of } from 'rxjs';
import { ProgramF } from '../../models/program-f';

describe('ProgramFComponent', () => {
  let component: ProgramFComponent;
  let fixture: ComponentFixture<ProgramFComponent>;
  let programFService: ProgramFService;

  beforeEach(async () => {
    programFService = jasmine.createSpyObj('ProgramFService', ['getPrograms', 'removeProgram']);
    await TestBed.configureTestingModule({
      declarations: [ ProgramFComponent ],
      providers: [ { provide: ProgramFService, useValue: programFService } ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load programs on init', () => {
    const testPrograms: ProgramF[] = [{ id: 1, title: 'Test Program', description: 'Test Description',formations:[] }];
    (programFService.getPrograms as jasmine.Spy).and.returnValue(of(testPrograms));
    component.ngOnInit();
    expect(component.programs).toEqual(testPrograms);
  });

  it('should delete program', () => {
    const testProgram: ProgramF = { id: 1, title: 'Test Program', description: 'Test Description',formations:[] };
    (programFService.removeProgram as jasmine.Spy).and.returnValue(of(null));
    component.deleteProgram(testProgram); // Pass the whole testProgram object
    expect(programFService.removeProgram).toHaveBeenCalledWith(testProgram.id);
  });
});