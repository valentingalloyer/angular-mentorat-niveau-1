import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class Header {
  title = 'Mentorat Angular – ToDo App';
  subtitle = 'Premier composant et data binding';

  // Property binding
  logoUrl = 'https://angular.io/assets/images/logos/angular/angular.svg';

  // Event binding
  onHeaderButtonClick(): void {
    console.log('Bouton header cliqué');
  }
}
