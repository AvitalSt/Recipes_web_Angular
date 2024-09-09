import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../service/user.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  nameU!: string;
  address!: string;
  email!: string;
  password!: string;
  nameIsIn!: boolean;
  passwordInvalid!: boolean;
  userList: User[] = [];
  newUser!: User;
  idU!: number;

  constructor(private _userService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.nameU = params.get('nameU') || '';
    });
    this._userService.getUserListFromServer().subscribe({
      next: (res) => {
        this.userList = res;
        this.idU = this.userList.length + 1;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  isPasswordValid(password: string): boolean {
    const hasLetters = /[a-zA-Z]/.test(password);
    const hasNumbers = /\d/.test(password);
    return password.length >= 4 && hasLetters && hasNumbers;
  }

  onSubmit() {
    if (!this.isPasswordValid(this.password)) {
      this.passwordInvalid = true;
      alert("הסיסמה חייבת להיות באורך של לפחות 4 תווים ולהכיל אותיות באנגלית ומספרים בלבד.");
      return;
    }

    for (let i = 0; i < this.userList.length; i++) {
      if (this.nameU === this.userList[i].nameU) {
        this.nameIsIn = true;
        return;
      }
    }

    this.nameIsIn = false;
    this.passwordInvalid = false;
    this.newUser = { idU: this.idU, nameU: this.nameU, address: this.address, email: this.email, password: this.password };
    this._userService.addUserFromServer(this.newUser).subscribe({
      next: (res) => {
        sessionStorage.setItem("currentUser", JSON.stringify(res));
        this.router.navigate(['/allRecipe', { idU: this.newUser.idU }]);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
