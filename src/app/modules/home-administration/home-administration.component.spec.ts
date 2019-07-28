import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAdministrationComponent } from './home-administration.component';

describe('HomeAdministrationComponent', () => {
  let component: HomeAdministrationComponent;
  let fixture: ComponentFixture<HomeAdministrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeAdministrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeAdministrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
