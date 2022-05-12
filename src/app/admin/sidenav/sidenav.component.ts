import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy {

  animal!: string;
  name!: string;
  notifier = new Subject()
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void { }

  ngOnDestroy() {
    this.notifier.next(1)
    this.notifier.complete()
  }

}
