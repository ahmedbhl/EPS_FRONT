import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasseModalComponent } from './classe-modal.component';

describe('ClasseModalComponent', () => {
  let component: ClasseModalComponent;
  let fixture: ComponentFixture<ClasseModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClasseModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClasseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
