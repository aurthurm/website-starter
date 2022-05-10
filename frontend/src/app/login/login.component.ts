import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  authForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(
    private loginService: LoginService,
    public fb: FormBuilder,
    public router: Router,
  ) { }

  ngOnInit(): void {
  }

  authenticate(): void {
    this.loginService.authenticate$(this.authForm.value).subscribe(authData => {
      localStorage.setItem("__nmrl_acc__", JSON.stringify(authData));
      this.router.navigate(['/dashboard'])
    })
  }

}
