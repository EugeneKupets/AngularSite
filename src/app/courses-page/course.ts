import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

export interface Course {
  id: number;
  title: string;
  category: string;
  duration: string;
}

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private initialCourses: Course[] = [
    { id: 1, title: 'Angular Basics', category: 'Frontend', duration: '5 годин' },
    { id: 2, title: 'RxJS Masterclass', category: 'Frontend', duration: '3 години' },
    { id: 3, title: 'Node.js Backend', category: 'Backend', duration: '8 годин' },
    { id: 4, title: 'PostgreSQL for Beginners', category: 'Database', duration: '4 години' },
    { id: 5, title: 'Kotlin Android Dev', category: 'Mobile', duration: '10 годин' }
  ];

  private coursesSubject = new BehaviorSubject<Course[]>(this.initialCourses);

  get courses$(): Observable<Course[]> {
    return this.coursesSubject.asObservable();
  }

  searchCourses(query: string): Observable<Course[]> {
    return this.courses$.pipe(
      map(courses => courses.filter(c =>
        c.title.toLowerCase().includes(query.toLowerCase())
      )),
      delay(300)
    );
  }

  addCourse(title: string, category: string, duration: string): void {
    const currentCourses = this.coursesSubject.getValue();
    const newId = currentCourses.length > 0 ? Math.max(...currentCourses.map(c => c.id)) + 1 : 1;

    const newCourse: Course = { id: newId, title, category, duration };

    this.coursesSubject.next([...currentCourses, newCourse]);
  }

  deleteCourse(id: number): void {
    const currentCourses = this.coursesSubject.getValue();
    const updatedCourses = currentCourses.filter(course => course.id !== id);

    this.coursesSubject.next(updatedCourses);
  }
}