import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login/service.service';

@Component({
  selector: 'app-navbar-main',
  templateUrl: './navbar-main.component.html',
  styleUrls: ['./navbar-main.component.scss']
})
export class NavbarMainComponent implements OnInit {
  user!: any;

  constructor(
    private loginService: LoginService,
  ) { }

  ngOnInit(): void {
    this.loginService.getAuthUser().then((res: any) => {
      this.user = res['user']
      console.log(res.user)
    })
  }

  logout(): void {
    this.loginService.logout();
  }

}
