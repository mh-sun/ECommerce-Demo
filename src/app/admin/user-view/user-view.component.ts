import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { LogService } from 'src/app/core/services/log.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {
  title: string | any;
  headerTitle: string | any;
  user: User | any;
  userIdFromRoute!: number;
  notifier = new Subject();

  constructor(private route: ActivatedRoute, private service: LogService) { }

  ngOnInit(): void {
    this.title = 'Edit Product';
    this.headerTitle = document.getElementById('headerTitle')
    this.headerTitle.innerText = this.title;
    const routeParams = this.route.snapshot.paramMap;
    this.userIdFromRoute = Number(routeParams.get('id'));
    const productSub = this.service.getOneUser(this.userIdFromRoute).pipe(takeUntil(this.notifier)).subscribe((res) => {
      this.user = res;
    });
  }

  ngOnDestroy(): void {
    this.notifier.next(1)
    this.notifier.complete()
  }

}
