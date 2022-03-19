import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  static isLoggedIn = false

  constructor (private fb:FormBuilder, private http:AuthService){}
  
  user = this.fb.group({
    number:['', [Validators.required, 
      Validators.maxLength(14),
      Validators.minLength(10)]],
    password:['', Validators.required]
  })

  onLogin(){
    console.log(this.user.value)
    let user = {
      number: this.user.value.number,
      password: this.user.value.password
    }
    this.http.Login(user).subscribe(res=>{
      console.log(res)
    })
  }
}
