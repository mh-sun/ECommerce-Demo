import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
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
    username:[''],
    name:this.fb.group({
      firstName: [''],
      lastName: [''],
    }),
    address: this.fb.group({
      city:[''],
      street:[''],
      number:[''],
      zip:['']
    }),
    email:['',Validators.required,Validators.email],
    password:['',Validators.required]
  });
  registerSubcription:any;
  
  constructor(private fb:FormBuilder,private http:AuthService) { }

  ngOnInit(): void {
  }
  onSubmit(){
    console.log(this.profileForm.value);
    const geolocation = {
      "lat":'',
      "long":''
    }
    let address = this.profileForm.get('address')?.value;
    const returnedTarget = Object.assign({geolocation}, address);
    
    //address.splice(0,0,geolocation);
    //address.push(this.profileForm.get('address')?.value);
    console.log(address,returnedTarget);
    const user:User = 
    { 
      address:returnedTarget,
      id:0,
      email:this.profileForm.get('email')?.value,
      username:this.profileForm.get('username')?.value,
      password:this.profileForm.get('password')?.value,
      name:this.profileForm.get('name')?.value,
      phone:'',
      cart:[]
    };
    
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
