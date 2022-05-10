import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {


    /* Aside & Navbar: dropdowns */
    Array.from(document.getElementsByClassName('dropdown')).forEach(elA => {
      elA.addEventListener('click', (e : any) => {
        if (e.currentTarget.classList.contains('navbar-item')) {
          e.currentTarget.classList.toggle('active')
        } else {
          const dropdownIcon = e.currentTarget.getElementsByClassName('mdi')[1]

          e.currentTarget.parentNode.classList.toggle('active')
          dropdownIcon.classList.toggle('mdi-plus')
          dropdownIcon.classList.toggle('mdi-minus')
        }
      })
    })


  }

}
