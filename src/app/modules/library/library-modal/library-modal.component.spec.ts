import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LibraryModalComponent } from './library-modal.component';

describe('LibraryModalComponent', () => {
  let component: LibraryModalComponent;
  let fixture: ComponentFixture<LibraryModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LibraryModalComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibraryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
