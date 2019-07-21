import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeActorsComponent } from './home-actors.component';

describe('HomeActorsComponent', () => {
  let component: HomeActorsComponent;
  let fixture: ComponentFixture<HomeActorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeActorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeActorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
