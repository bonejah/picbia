import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PlataformDetectorService } from 'src/app/core/plataform/plataform-detector.service';

@Component({
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SignInComponent implements OnInit {

  fromUrl: string;
  loginForm: FormGroup;
  @ViewChild('userNameInput') userNameInput: ElementRef<HTMLInputElement>;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private platformDetectorService: PlataformDetectorService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.fromUrl = params.fromUrl;
    });

    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
    // tslint:disable-next-line:no-unused-expression
    this.platformDetectorService.isPlataformBrowser() && this.userNameInput.nativeElement.focus();
  }

  login() {
    console.log('vai se logar');
    const userName = this.loginForm.get('userName').value;
    const password = this.loginForm.get('password').value;
    this.authService
      .authenticate(userName, password)
      .subscribe(
        () => this.fromUrl
            ? this.router.navigateByUrl(this.fromUrl)
            : this.router.navigate(['user', userName])
        ,
        err => {
          console.log(err);
          this.loginForm.reset();
          // tslint:disable-next-line:no-unused-expression
          this.platformDetectorService.isPlataformBrowser() && this.userNameInput.nativeElement.focus();
          alert('Invalid user name or password');
        }
      );
  }

}
