import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {Tasks} from './components/pages/tasks/tasks';
import {About} from './components/pages/about/about';

const routes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  { path: 'tasks', component: Tasks },
  { path: 'about', component: About },
  { path: '**', redirectTo: 'tasks' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {



}
