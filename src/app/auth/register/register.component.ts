import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user.login.model';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit,OnDestroy {
  profileForm = this.fb.group({
    removeValidator:[''],
    firstName: [''],
    lastName: [''],
    address:[''],
    email:['',Validators.required],
    gender:[''],
    password:['',Validators.required]
  });
  registerSubcription:any;
  
  constructor(private fb:FormBuilder,private http:AuthService) { }

  ngOnInit(): void {
  }
  onSubmit(){
    console.log(this.profileForm.value);
    let newId = +this.http.getId()+1;
    const user:User = {id:newId,email:this.profileForm.get('email')?.value,password:this.profileForm.get('password')?.value};
    
    this.registerSubcription =this.http.Registration(user).subscribe((data: any)=>{
      console.log(data)
    });
    this.profileForm.reset();
  }
  ngOnDestroy(){
    if(this.registerSubcription)
       this.registerSubcription.unsubscribe();

  }

}
