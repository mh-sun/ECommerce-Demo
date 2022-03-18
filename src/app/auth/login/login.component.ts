import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor (private fb:FormBuilder){}
  
  user = this.fb.group({
    number:['', [Validators.required, 
      Validators.maxLength(14),
      Validators.minLength(10)]],
    password:['', Validators.required]
  })

  onLogin(){
    
  }
}
