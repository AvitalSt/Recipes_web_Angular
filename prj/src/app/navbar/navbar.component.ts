import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(private _router: Router) {
  }

  checkAuthentication() {
    const isAuthenticated = this._router.url.includes('/addRecipe');
    if (!isAuthenticated) {
      alert('נא להתחבר לפני הוספת מתכון.');
      return;
    }
  }

  logout() {
    sessionStorage.removeItem("currentUser");
    this._router.navigate(['/login']);
  }
}
