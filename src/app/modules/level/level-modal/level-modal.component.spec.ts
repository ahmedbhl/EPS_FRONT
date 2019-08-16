import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelModalComponent } from './level-modal.component';

describe('LevelModalComponent', () => {
  let component: LevelModalComponent;
  let fixture: ComponentFixture<LevelModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LevelModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
