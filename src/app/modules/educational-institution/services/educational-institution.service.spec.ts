import { TestBed } from '@angular/core/testing';

import { EducationalInstitutionService } from './educational-institution.service';

describe('EducationalInstitutionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EducationalInstitutionService = TestBed.get(EducationalInstitutionService);
    expect(service).toBeTruthy();
  });
});
