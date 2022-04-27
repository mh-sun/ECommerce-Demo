import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { LogService } from 'src/app/core/services/log.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit,OnDestroy {

  public user!:User
  public subscription = new Subject()

  constructor(
    private logger:LogService
  ) { }
  

  ngOnInit(): void {
    this.logger.loggedUser.pipe(takeUntil(this.subscription))
    .subscribe(user=>{
      if(user)
        this.user = user
    })
  }

  ngOnDestroy(): void {
    this.subscription.next(1)
    this.subscription.complete()
  }
}
