import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/core/models/product.model';
import { ProductListComponent } from '../product-list/product-list.component';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product:Product | undefined;
  constructor() { }

  ngOnInit(): void {
  }

}
