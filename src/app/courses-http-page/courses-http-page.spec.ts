import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesHttpPage } from './courses-http-page';

describe('CoursesHttpPage', () => {
  let component: CoursesHttpPage;
  let fixture: ComponentFixture<CoursesHttpPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoursesHttpPage],
    }).compileComponents();

    fixture = TestBed.createComponent(CoursesHttpPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
