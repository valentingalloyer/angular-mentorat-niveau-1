import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import {FormsModule} from '@angular/forms';
import { PokemonItem } from './components/pokemon-item/pokemon-item';
import { Team } from './pages/team/team';
import { Pokedex } from './pages/pokedex/pokedex';

@NgModule({
  declarations: [
    App,
    PokemonItem,
    Team,
    Pokedex
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
