import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { LogService } from 'src/app/core/services/log.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  
  profileForm = this.fb.group({
    removeValidator: [''],
    username: [''],
    name: this.fb.group({
      firstname: [''],
      lastname: [''],
    }),
    address: this.fb.group({
      city: [''],
      street: [''],
      number: [''],
      zipcode: ['']
    }),
    email: ['', Validators.required, Validators.email],
    password: ['', Validators.required],
    phone: ['', Validators.required]
  });
  show = false;
  registerSubcription: any;

  constructor(private fb: FormBuilder, private http: LogService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.profileForm.value);
    // const geolocation = {
    //   "lat":'',
    //   "long":''
    // }
    let address = this.profileForm.get('address')?.value;
    // const returnedTarget = Object.assign({geolocation}, address);

    //address.splice(0,0,geolocation);
    //address.push(this.profileForm.get('address')?.value);
    // console.log(address,returnedTarget);
    const user: User =
    {
      address: address,
      id: 0,
      email: this.profileForm.get('email')?.value,
      username: this.profileForm.get('username')?.value,
      password: this.profileForm.get('password')?.value,
      name: this.profileForm.get('name')?.value,
      phone: '',
      carts: [],
      orders: []
    };

    this.registerSubcription = this.http.Registration(user).subscribe((data: any) => {
      console.log(data)
    });
    this.profileForm.reset();
    this.show = true;
    setInterval(() => {
      {
        this.router.navigate(['/'])
      }
    }, 2000)
  }

  ngOnDestroy() {
    if (this.registerSubcription)
      this.registerSubcription.unsubscribe();
  }

}
