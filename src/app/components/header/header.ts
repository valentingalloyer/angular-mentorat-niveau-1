import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class Header {
  title: string = 'Mentorat Angular – ToDo App';
  subtitle: string = 'Premier composant et data binding';

  // Property binding
  logoUrl: string =
    'https://angular.io/assets/images/logos/angular/angular.svg';

  // Event binding
  onHeaderButtonClick(): void {
    console.log('Bouton header cliqué');
  }
}
