import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseHttpService, Course } from '../services/course-http';

@Component({
  selector: 'app-courses-http-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './courses-http-page.html',
  styleUrl: './courses-http-page.css',
})
export class CoursesHttpPage implements OnInit {
  courses: Course[] = [];
  loading = false;
  error: string | null = null;

  constructor(private courseService: CourseHttpService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.fetchCourses();
  }

  fetchCourses(): void {
    console.log('fetchCourses called');
    this.loading = true;
    this.error = null;
    this.courseService.getCourses().subscribe({
      next: (data) => {
        console.log('Component received data:', data);
        this.courses = data;
        this.loading = false;
        this.cdr.detectChanges(); // Trigger update manually
      },
      error: (err) => {
        console.error('Component received error:', err);
        this.error = err.message;
        this.loading = false;
        this.cdr.detectChanges(); // Trigger update manually
      }
    });
  }
}
