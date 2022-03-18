import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  profileForm = this.fb.group({
    removeValidator:[''],
    firstName: [''],
    lastName: [''],
    address:[''],
    email:[''],
    password:['']
  });
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
  }
  onSubmit(){
    console.log(this.profileForm.value);
  }

}
