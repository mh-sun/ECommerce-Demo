import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { LogService } from 'src/app/core/services/log.service';
import { Router } from '@angular/router';
import { CustomValidationService } from 'src/app/core/shared/custom-validation.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  profileForm = this.fb.group({
    removeValidator: [''],
    username: ['', this.customValidator.userNameValidator.bind(this.customValidator)],
    name: this.fb.group({
      firstname: ['', this.customValidator.nameValidator.bind(this.customValidator)],
      lastname: ['', this.customValidator.nameValidator.bind(this.customValidator)],
    }),
    address: this.fb.group({
      city: [''],
      street: [''],
      number: [''],
      zipcode: ['', this.customValidator.numberValidator.bind(this.customValidator)]
    }),
    email: ['', Validators.required],
    password: ['', Validators.required],
    phone: ['', { validators: [Validators.required, this.customValidator.numberValidator.bind(this.customValidator)] }]
  });
  show = false;
  registerSubcription: any;

  get fName() {
    return this.profileForm.get('name')?.get('firstname')!;
  }

  get lName() {
    return this.profileForm.get('name')?.get('lastname')!;
  }

  get uName() {
    return this.profileForm.get('username')!;
  }

  get phone() {
    return this.profileForm.get('phone')!;
  }

  get code() {
    return this.profileForm.get('address')?.get('zipcode')!;
  }

  constructor(private fb: FormBuilder, private http: LogService, private router: Router, private customValidator: CustomValidationService) { this.show = false; }

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.profileForm.get('name')?.get('firstname'));
    let address = this.profileForm.get('address')?.value;;
    const user: User =
    {
      address: address,
      id: 0,
      email: this.profileForm.get('email')?.value,
      username: this.profileForm.get('username')?.value,
      password: this.profileForm.get('password')?.value,
      name: this.profileForm.get('name')?.value,
      phone: this.profileForm.get('phone')?.value,
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
