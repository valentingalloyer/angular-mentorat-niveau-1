import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Header } from './components/header/header';
import { Ex1 } from './components/ex1/ex1';
import {TaskItem} from './components/task-item/task-item';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { About } from './components/pages/about/about';
import { Tasks } from './components/pages/tasks/tasks';

@NgModule({
  declarations: [
    App,
    Header,
    Ex1,
    TaskItem,
    About,
    Tasks
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
