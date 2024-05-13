import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide = true;

  loginform!: FormGroup;

  ngOnInit(): void {
    this.loginform = new FormGroup({
      emailFormControl: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      passwordFormControl: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\\S+$).{8,20}$'
        ),
      ]),
    });
  }

  num!: boolean;
  small!: boolean;
  cap!: boolean;
  space!: boolean;
  len!: boolean;
  show: boolean = false;

  onPasswordFill() {
    this.show = true;
    const numPattern = /(?=.*[0-9])/;
    const smallPattern = /(?=.*[a-z])/;
    const capPattern = /(?=.*[A-Z])/;
    const nospace = /(?=\\S+$)/;
    const password = this.loginform.controls['passwordFormControl'].value;

    if (numPattern.test(password)) {
      this.num = true;
    } else {
      this.num = false;
    }

    if (smallPattern.test(password)) {
      this.small = true;
    } else {
      this.small = false;
    }

    if (capPattern.test(password)) {
      this.cap = true;
    } else {
      this.cap = false;
    }

    if (!nospace.test(password)) {
      this.space = true;
    } else {
      this.space = false;
    }

    if (password.length >= 8 && password.length <= 15) {
      this.len = true;
    } else {
      this.len = false;
    }
  }

  onLogin() {
    console.log(this.loginform);
  }
}
