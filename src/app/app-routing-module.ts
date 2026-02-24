import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {Pokedex} from './pages/pokedex/pokedex';
import {Team} from './pages/team/team';

const routes: Routes = [
  { path: '', redirectTo: 'team', pathMatch: 'full' },
  { path: 'team', component: Team },
  { path: 'pokedex', component: Pokedex },
  { path: '**', redirectTo: 'team' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
