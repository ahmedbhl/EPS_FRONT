import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSuperAdminComponent } from './home-super-admin.component';

describe('HomeSuperAdminComponent', () => {
  let component: HomeSuperAdminComponent;
  let fixture: ComponentFixture<HomeSuperAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeSuperAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeSuperAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
