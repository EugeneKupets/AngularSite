import { Routes } from '@angular/router';
import { CoursesPage } from './courses-page/courses-page';
import { CoursesHttpPage } from './courses-http-page/courses-http-page';

export const routes: Routes = [
  { path: 'local', component: CoursesPage },
  { path: 'http', component: CoursesHttpPage },
  { path: '', redirectTo: '/http', pathMatch: 'full' },
  { path: '**', redirectTo: '/http' }
];
