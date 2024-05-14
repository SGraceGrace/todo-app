import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  hide1 = true;
  hide2 = true;
  signupform!: FormGroup;

  ngOnInit(): void {
    this.signupform = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      fname: new FormControl('', [Validators.required]),
      lname: new FormControl('', [Validators.required]),
      pno: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      cpassword: new FormControl({ value: '', disabled: true }, [
        Validators.required,
      ]),
    });
  }

  passwordCheck(): void {
    if (
      this.signupform.controls['cpassword'].value !=
      this.signupform.controls['password'].value
    ) {
      this.signupform.controls['cpassword'].setErrors({ mismatch: true });
    } else {
      this.signupform.controls['cpassword'].setErrors(null);
    }
  }

  num!: boolean;
  small!: boolean;
  cap!: boolean;
  space!: boolean;
  len!: boolean;
  show: boolean = false;

  enablePassword() {
    if (this.signupform.controls['password'].value) {
      this.signupform.controls['cpassword'].enable();
    } else {
      this.signupform.controls['cpassword'].reset();
      this.signupform.controls['cpassword'].disable();
    }
    
    const numPattern = /(?=.*[0-9])/;
    const smallPattern = /(?=.*[a-z])/;
    const capPattern = /(?=.*[A-Z])/;
    const nospace = /\s/g;
    const pass = this.signupform.controls['password'].value;

    if (numPattern.test(pass)) {
      this.num = true;
    } else {
      this.num = false;
    }
    if (smallPattern.test(pass)) {
      this.small = true;
    } else {
      this.small = false;
    }
    if (capPattern.test(pass)) {
      this.cap = true;
    } else {
      this.cap = false;
    }
    if (nospace.test(pass)) {
      this.space = false;
    } else {
      this.space = true;
    }
    if (pass.length >= 8 && pass.length <= 15) {
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

  onSignup() {
    console.log(this.signupform);
  }
}
