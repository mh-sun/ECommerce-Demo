import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { User } from '../core/models/user.model';
import { LogService } from '../core/services/log.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit,OnDestroy {

  public user:User|null  = null
  public subscription = new Subject()

  constructor(
    private logger:LogService
  ) { }

  ngOnInit(): void {
    this.logger.loggedUser
    .pipe(takeUntil(this.subscription))
    .subscribe(user=>{
      console.log(user)
      this.user = user
    })

  }

  ngOnDestroy(): void {
    this.subscription.next(1)
    this.subscription.complete()
  }
}
