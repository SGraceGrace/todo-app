import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { confirmPasswordValidator } from '../custom-validators/passwordvalidator';

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
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\\S+$).{8,20}$'
        ),
      ]),
      cpassword: new FormControl({value: '', disabled: true}, [Validators.required]),
    });
  }

  enablePassword() {
    if (this.signupform.controls['password'].value) {
      this.signupform.controls['cpassword'].enable();
    } else {
      this.signupform.controls['cpassword'].reset();
      this.signupform.controls['cpassword'].disable();
    }
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

  onSignup() {
    console.log(this.signupform);
  }
}
