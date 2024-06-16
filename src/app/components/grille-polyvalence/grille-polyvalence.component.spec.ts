import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GrillePolyvalenceComponent } from './grille-polyvalence.component';

describe('GrillePolyvalenceComponent', () => {
  let component: GrillePolyvalenceComponent;
  let fixture: ComponentFixture<GrillePolyvalenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrillePolyvalenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrillePolyvalenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
