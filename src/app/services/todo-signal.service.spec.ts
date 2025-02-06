import { TestBed } from '@angular/core/testing';

import { TodoSignalService } from './todo-signal.service';

describe('TodoSignalService', () => {
  let service: TodoSignalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoSignalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
