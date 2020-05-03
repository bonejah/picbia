import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { lowerCaseValidator } from 'src/app/shared/validators/lower-case.validator';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';
import { NewUser } from './new-user';
import { SignupService } from './singup.service';
import { Router } from '@angular/router';
import { PlataformDetectorService } from 'src/app/core/plataform/plataform-detector.service';
import { userNamePassword } from './usernam-password.validator';

@Component({
  templateUrl: './signup.component.html',
  providers: [ UserNotTakenValidatorService ]
})
export class SignUpComponent implements OnInit {

  signupForm: FormGroup;
  @ViewChild('emailInput') emailInput: ElementRef<HTMLInputElement>;

  constructor(
    private formBuilder: FormBuilder,
    private userNotTakenValidatorService: UserNotTakenValidatorService,
    private signupService: SignupService,
    private router: Router,
    private platformDetectorService: PlataformDetectorService) {
  }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      userName: ['',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(40),
          lowerCaseValidator
        ],
        this.userNotTakenValidatorService.checkUserNameTaken()
      ],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(14)]]
    }, {
      validator: userNamePassword
    });

    // tslint:disable-next-line:no-unused-expression
    this.platformDetectorService.isPlataformBrowser() && this.emailInput.nativeElement.focus();
  }

  singup() {
    if (this.signupForm.valid && !this.signupForm.pending) {
      const newUser = this.signupForm.getRawValue() as NewUser;
      this.signupService.singup(newUser)
        .subscribe(
          () => this.router.navigate(['']),
          err => console.log(err));
    }
  }

}
