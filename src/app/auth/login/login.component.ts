import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/core/models/user.login.model';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor (private fb:FormBuilder, private http:AuthService){}
  
  user = this.fb.group({
    number:['', [Validators.required, 
      Validators.maxLength(14),
      Validators.minLength(10)]],
    password:['', Validators.required]
  })

  users: any

  onLogin(){
    this.http.Login().subscribe((res)=>{
      
      console.log(res)
      this.users = res
    })

    let timer = setTimeout(()=>{
        console.log(this.users, typeof this.users)
        this.users.forEach((user:any) => {
          if(user.number === this.user.value.number && user.password === this.user.value.password){
            this.http.isLoggedIn = true
            console.log('logged in')
            clearTimeout(timer)
          }
          else console.log(user.number, 'not matched')
        });
    },1000)
  }
}
