import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { AddProductComponent } from '../add-product/add-product.component';

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

  openDialog(): void {
    let dialogRef = this.dialog.open(AddProductComponent, {});

    const dialogSub = dialogRef.afterClosed().pipe(takeUntil(this.notifier)).subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnDestroy() {
    this.notifier.next(1)
    this.notifier.complete()
  }

}
