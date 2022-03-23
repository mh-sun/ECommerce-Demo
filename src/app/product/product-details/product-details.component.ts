import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/core/models/product.model';
import { CartApiService } from 'src/app/core/services/cart-api.service';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  // product:Product | undefined;
  // constructor(private route:ActivatedRoute,private service:ProductsService,private cartService:CartApiService) { }

  ngOnInit(): void {
    // const routeParams = this.route.snapshot.paramMap;
    // const productIdFromRoute = Number(routeParams.get('productId'));
    // this.getProducts(productIdFromRoute);
  }
  // getProducts(gotId:number){
  //   this.service.getProduct().subscribe((products:Product[])=>{
  //     for(let gotProduct of products){
  //       if(gotProduct.id == gotId){
  //         this.product = gotProduct;
  //       }
  //     }
  //   });
  // }
  // addToCart(product:Product){
  //   this.cartService.addToCart(product);
  //   window.alert('Your product has been added to the cart!');
  // }


}
