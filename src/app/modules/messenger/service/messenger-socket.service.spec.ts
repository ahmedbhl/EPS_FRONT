import { TestBed } from '@angular/core/testing';

import { MessengerSocketService } from './messenger-socket.service';

describe('MessengerSocketService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MessengerSocketService = TestBed.get(MessengerSocketService);
    expect(service).toBeTruthy();
  });
});
