import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationalInstitutionComponent } from './educational-institution.component';

describe('EducationalInstitutionComponent', () => {
  let component: EducationalInstitutionComponent;
  let fixture: ComponentFixture<EducationalInstitutionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducationalInstitutionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationalInstitutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
