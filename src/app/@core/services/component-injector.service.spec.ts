import { TestBed } from '@angular/core/testing';

import { ComponentInjectorService } from './component-injector.service';

describe('ComponentInjectorService', () => {
  let service: ComponentInjectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComponentInjectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
