import { TestBed } from '@angular/core/testing';
import { LevelService } from './level.service';


describe('LevelServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LevelService = TestBed.get(LevelService);
    expect(service).toBeTruthy();
  });
});
