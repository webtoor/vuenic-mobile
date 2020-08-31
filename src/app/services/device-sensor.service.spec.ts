import { TestBed } from '@angular/core/testing';

import { DeviceSensorService } from './device-sensor.service';

describe('DeviceSensorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeviceSensorService = TestBed.get(DeviceSensorService);
    expect(service).toBeTruthy();
  });
});
