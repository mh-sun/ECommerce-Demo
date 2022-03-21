import { TestBed } from '@angular/core/testing';

import { AddIDInterceptor } from './add-id.interceptor';

describe('AddIDInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AddIDInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AddIDInterceptor = TestBed.inject(AddIDInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
