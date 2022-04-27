import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { LogService } from 'src/app/core/services/log.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

  title: string | any;
  headerTitle: string | any;
  displayedColumns: string[] = ['id', 'name', 'email', 'address', 'phone', 'view','remove'];
  dataSource: any;
  active!: string;
  notifier = new Subject()

  constructor(private route: Router, private service: LogService) {
    this.title = 'User List';
    this.headerTitle = document.getElementById('headerTitle')
    this.headerTitle.innerText = this.title;
  }

  ngOnInit(): void {
    const userSub = this.service.getUsers().pipe(takeUntil(this.notifier)).subscribe({
      next: res => {
        console.log(res)
        this.dataSource = res;
      },
      error: (err) => {
        console.log(err)
      },
      complete: () => {
        console.log("Complete")
      }
    })
  }

  removeUser(id: number) {
    this.service.deleteUser(id).subscribe(response => {
      this.dataSource = this.dataSource.filter(((item: { id: number; }) => item.id !== id))
    });;
  }

  ngOnDestroy() {
    this.notifier.next(1)
    this.notifier.complete()
  }

}
