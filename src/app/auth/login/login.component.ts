import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import {MatDialog} from '@angular/material/dialog';
import { CredentialsMismatchComponent } from './credentials-mismatch/credentials-mismatch.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy{

  constructor (private fb:FormBuilder, 
    private http:AuthService,
    private route:Router,
    private dialog:MatDialog,
  ){}
  
  user = this.fb.group({
    email:['', [
      Validators.required,
      Validators.email
    ]],
    password:['', Validators.required]
  })

  loginSubscription:any = null

  onLogin(){
    this.loginSubscription = this.http.login().subscribe((users:any[])=>{
      for(let i=0; i<users.length; i++){
        let user = users[i]
        if(user.number === this.user.value.number && user.password === this.user.value.password){
          console.log('logged in')
          AuthService.logStatus = true
          this.user.reset()
          this.route.navigate(['/products'])
          return
        }
      }
      this.showDialog()
      this.user.reset()
    })
  }

  ngOnDestroy(): void {
    if(this.loginSubscription)
      this.loginSubscription.unsubscribe()
  }

  showDialog() {
    this.dialog.open(CredentialsMismatchComponent)
  }
}