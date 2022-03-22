import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/core/models/product.model';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
   products:Product[]=[]
  
  constructor(private service:ProductsService) { }

  ngOnInit(): void {
    this.getProduct();
  }
  getProduct():void{
    this.service.getProduct().subscribe(product=>{this.products = product});
  }
  share() {
    window.alert('The product has been shared!');
   }
  onNotifyMe(){
    window.alert('You will be notified when the product goes on sale');
  }

}
