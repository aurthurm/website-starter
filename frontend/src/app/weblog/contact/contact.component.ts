import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ContactService } from 'src/app/dashboard/contact/service/contact.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  sending = false;
  message = ""

  contactForm = this.fb.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required]],
    message: ['', [Validators.required]],
  });

  constructor(
    private contactService: ContactService,
    public fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  contactEnquiry(): void {
    this.sending = true;
    this.contactService.save$(this.contactForm.value)
    .subscribe(
      res => { 
        console.log(res);
        Swal.fire({
          title: 'Thank you for your message! We will be in touch with you soon',
          timer: 50000,
          timerProgressBar: true,
          icon: 'success',
          customClass: {
            timerProgressBar: 'timer-progress'
          },
          didOpen: () => {
            this.sending = false;
            this.contactForm.reset()
            this.message = "Your message was successfully sent"
          },
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            setTimeout(() => this.message = "", 3000)
          }
        })
      },
      error => { console.log("error: ", error) }
    )


  }

}
