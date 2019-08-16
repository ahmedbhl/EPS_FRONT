import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationalInstitutionModalComponent } from './educational-institution-modal.component';

describe('EducationalInstitutionModalComponent', () => {
  let component: EducationalInstitutionModalComponent;
  let fixture: ComponentFixture<EducationalInstitutionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducationalInstitutionModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationalInstitutionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
