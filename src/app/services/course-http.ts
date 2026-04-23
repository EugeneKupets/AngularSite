import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, delay, tap } from 'rxjs/operators';

export interface Course {
  id: number;
  title: string;
  category: string;
  duration: number;
}

@Injectable({
  providedIn: 'root'
})
export class CourseHttpService {
  private apiUrl = 'http://localhost:3000/courses';

  constructor(private http: HttpClient) { }

  getCourses(): Observable<Course[]> {
    console.log('Sending HTTP GET request to:', this.apiUrl);
    return this.http.get<Course[]>(this.apiUrl).pipe(
      tap(data => console.log('Received data from HTTP:', data)),
      delay(800), // Artificial delay to demonstrate loading state
      catchError((error) => this.handleError(error))
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('HTTP Error occurred:', error);
    let errorMessage = 'Unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Backend returned an unsuccessful response code
      errorMessage = `Server Error: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
