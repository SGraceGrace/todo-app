import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide = true;

  loginform!: FormGroup;

  constructor(private router: Router){}

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
    const numPattern = /(?=.*[0-9])/;
    const smallPattern = /(?=.*[a-z])/;
    const capPattern = /(?=.*[A-Z])/;
    const nospace = /\s/g;
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

    if (nospace.test(password)) {
      this.space = false;
    } else {
      this.space = true;
    }

    if (password.length >= 8 && password.length <= 15) {
      this.len = true;
    } else {
      this.len = false;
    }
  }

  @HostListener('click', ['$event.target'])
  onClick(event: HTMLInputElement) {
    if (event.name === 'password') {
      this.show = true;
    } else {
      this.show = false;
    }
  }

  onLogin() {
    console.log(this.loginform);
    this.router.navigate(['/user/home']);
  }
}
