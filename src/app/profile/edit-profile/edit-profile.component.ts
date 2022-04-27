import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { LogService } from 'src/app/core/services/log.service';
import { CustomValidationService } from 'src/app/core/shared/custom-validation.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit,OnDestroy {

  public user!:User
  public subscription = new Subject()
  public profileForm:any

  constructor(
    private logger:LogService,
    private fb: FormBuilder,
    private customValidator:CustomValidationService,
    private router: Router
  ) { }
  

  ngOnInit(): void {
    this.logger.loggedUser.pipe(takeUntil(this.subscription))
    .subscribe(user=>{
      if(user)
        this.user = user
        this.profileForm = this.fb.group({
          removeValidator: [''],
          username: [this.user.username,this.customValidator.userNameValidator.bind(this.customValidator)],
          name: this.fb.group({
            firstname: [this.user.name.firstname,this.customValidator.nameValidator.bind(this.customValidator)],
            lastname: [this.user.name.lastname,this.customValidator.nameValidator.bind(this.customValidator)],
          }),
          address: this.fb.group({
            city: [this.user.address.city],
            street: [this.user.address.street],
            number: [this.user.address.number],
            zipcode: [this.user.address.zipcode,this.customValidator.numberValidator.bind(this.customValidator)]
          }),
          email: [this.user.email, Validators.required],
          password: [this.user.password, Validators.required],
          phone: [this.user.phone, this.customValidator.numberValidator.bind(this.customValidator)]
        });
    })
  }

  ngOnDestroy(): void {
    this.subscription.next(1)
    this.subscription.complete()
  }

  onSubmit() {
    const user =
    {
      address: this.profileForm.get('address')?.value,
      email: this.profileForm.get('email')?.value,
      username: this.profileForm.get('username')?.value,
      password: this.profileForm.get('password')?.value,
      name: this.profileForm.get('name')?.value,
      phone: this.profileForm.get('phone')?.value,
    }

    this.logger.updateUser(this.user.id, user).pipe(takeUntil(this.subscription))
    .subscribe(res=>{
      console.log(res)
      this.logger.loggedUser.next(res)
      this.profileForm.reset();
      this.router.navigate(['/profile'])
    })

  }
}