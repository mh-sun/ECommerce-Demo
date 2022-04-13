import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { CredentialsMismatchComponent } from './credentials-mismatch/credentials-mismatch.component';
import { LogService } from 'src/app/core/services/log.service';
import { User } from 'src/app/core/models/user.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy{

  constructor (private fb:FormBuilder, 
    private route:Router,
    private dialog:MatDialog,
    private logger:LogService
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
    this.loginSubscription = this.logger.getUsers().subscribe((users:User[])=>{
      console.log(users)
      for(let i=0; i<users.length; i++){
        let user = users[i]
        if(
          user.email === this.user.value.email && 
          user.password === this.user.value.password
        ){
          this.logger.logIn(user)
          this.user.reset()
          this.route.navigate(['/'])
          return
        }
      }
      this.showDialog()
      this.user.reset()
    })
  }

  ngOnDestroy(): void {
    if(this.loginSubscription){
      console.log("login subscription unsubscribed")
      this.loginSubscription.unsubscribe()
    }
  }

  showDialog() {
    this.dialog.open(CredentialsMismatchComponent)
  }
}