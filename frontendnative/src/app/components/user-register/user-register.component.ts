import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {



  public registerForm = this.fb.group({
    name: ['Fernando', Validators.required, Validators.minLength(3)],
    email: ['test@gmail.com', Validators.required],
    password: ['123456@gmail.com', Validators.required]
  })

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

}
