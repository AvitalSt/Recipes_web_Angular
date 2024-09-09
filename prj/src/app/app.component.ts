import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { AllRecipesComponent } from "./all-recipes/all-recipes.component";
import { NavbarComponent } from "./navbar/navbar.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    imports: [RouterOutlet, RegisterComponent, LoginComponent, AllRecipesComponent, NavbarComponent]
})
export class AppComponent {
  title = 'prj';
}
