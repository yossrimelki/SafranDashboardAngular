import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTableComponent } from './user-table-component.component';

describe('UserTableComponentComponent', () => {
  let component: UserTableComponent;
  let fixture: ComponentFixture<UserTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserTableComponent]
    });
    fixture = TestBed.createComponent(UserTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
