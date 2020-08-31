import { TestBed } from '@angular/core/testing';

import { UserProjectService } from './user-project.service';

describe('UserProjectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserProjectService = TestBed.get(UserProjectService);
    expect(service).toBeTruthy();
  });
});
