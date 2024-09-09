import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  idU = -1;
  nameU?: string;
  password?: string;
  loginFailed!: boolean;
  nameIsIn!: boolean;
  userList: User[] = [];

  constructor(private router: Router, private _userService: UserService) { }

  ngOnInit() {
    this._userService.getUserListFromServer().subscribe({
      next: (res) => {
        this.userList = res;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  onSubmit() {
    let userExists = false;
    let correctPassword = false;

    for (let i = 0; i < this.userList.length; i++) {
      if (this.nameU === this.userList[i].nameU) {
        userExists = true;
        if (this.password === this.userList[i].password) {
          correctPassword = true;
          this.idU = this.userList[i].idU;
          break;
        }
      }
    }
    if (userExists && !correctPassword) {
      this.loginFailed = true;
    } else if (!userExists) {
      this.router.navigate(['/register', { nameU: this.nameU }]);
    } else if (correctPassword) {
      sessionStorage.setItem("currentUser", JSON.stringify(this.idU));
      this.router.navigate(['/allRecipe', { idU: this.idU }]);
    }
  }
}
