import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ProductsService } from 'src/app/core/services/products.service';
import { ProductAddComponent } from '../product-add/product-add.component';
// import { AddProductComponent } from './add-product/add-product.component';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  title: string | any;
  headerTitle: string | any;
  displayedColumns: string[] = ['id', 'title', 'price', 'description', 'availailability', 'edit'];
  dataSource: any;
  active!: string;
  notifier = new Subject();
 

  constructor(private route: Router, private service: ProductsService,public dialog: MatDialog) {
    this.title = 'Product List';
    this.headerTitle = document.getElementById('headerTitle')
    this.headerTitle.innerText = this.title;
  }

  ngOnInit(): void {
    this.service.getProduct().pipe(takeUntil(this.notifier)).subscribe((res) => {
      this.dataSource = res;
    });
  }

  activate(state: boolean, i: number) {
    this.dataSource[i].isActive = !state;
    let index = i + 1;
    this.service.updateProduct(this.dataSource[i], index);
  }

  delete(id: number) {
    this.service.deleteProduct(id);
    this.ngOnInit();
  }
  openDialog(): void {
    let dialogRef = this.dialog.open(ProductAddComponent, {});

    const dialogSub = dialogRef.afterClosed().pipe(takeUntil(this.notifier)).subscribe(() => {
      this.ngOnInit();
      console.log('The dialog was closed');
    });
  }
  ngOnDestroy(): void {
    this.notifier.next(1)
    this.notifier.complete()
  }

}
