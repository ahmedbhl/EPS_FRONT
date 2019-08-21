import { TestBed } from '@angular/core/testing';
import { ClasseService } from './classe.service';


describe('ClasseServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClasseService = TestBed.get(ClasseService);
    expect(service).toBeTruthy();
  });
});
