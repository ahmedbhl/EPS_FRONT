import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeActorsModalComponent } from './home-actors-modal.component';

describe('HomeActorsModalComponent', () => {
  let component: HomeActorsModalComponent;
  let fixture: ComponentFixture<HomeActorsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeActorsModalComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeActorsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
