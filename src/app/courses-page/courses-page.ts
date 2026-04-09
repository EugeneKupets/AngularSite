import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, combineLatest } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, startWith, map } from 'rxjs/operators';
import { CourseService, Course } from './course';

@Component({
  selector: 'app-courses-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './courses-page.html',
  styleUrls: ['./courses-page.css']
})
export class CoursesPage implements OnInit {
  searchControl = new FormControl('');
  categoryControl = new FormControl('All');

  courses$!: Observable<Course[]>;
  categories$!: Observable<string[]>;

  courseForm = new FormGroup({
    title: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    duration: new FormControl('', Validators.required)
  });

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.categories$ = this.courseService.categories$;

    const search$ = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(query => query ? query.trim() : ''),
      debounceTime(400),
      distinctUntilChanged()
    );

    const category$ = this.categoryControl.valueChanges.pipe(
      startWith('All')
    );

    this.courses$ = combineLatest([search$, category$]).pipe(
      switchMap(([query, category]) =>
        this.courseService.searchCourses(query, category || 'All')
      )
    );
  }

  onAddCourse(): void {
    if (this.courseForm.valid) {
      const { title, category, duration } = this.courseForm.value;
      this.courseService.addCourse(title!, category!, duration!);
      this.courseForm.reset();

      this.categoryControl.setValue('All');
    }
  }

  onDeleteCourse(id: number): void {
    this.courseService.deleteCourse(id);
  }
}