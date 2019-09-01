import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEducationalInstitutionComponent } from './create-educational-institution.component';

describe('CreateEducationalInstitutionComponent', () => {
  let component: CreateEducationalInstitutionComponent;
  let fixture: ComponentFixture<CreateEducationalInstitutionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEducationalInstitutionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEducationalInstitutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
