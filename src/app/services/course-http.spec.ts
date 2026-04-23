import { TestBed } from '@angular/core/testing';

import { CourseHttp } from './course-http';

describe('CourseHttp', () => {
  let service: CourseHttp;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseHttp);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
