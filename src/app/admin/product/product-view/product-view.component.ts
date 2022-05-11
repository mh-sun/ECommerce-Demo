import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Product } from 'src/app/core/models/product.model';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit, OnDestroy {

  title: string | any;
  headerTitle: string | any;
  product: Product | any;
  productIdFromRoute!: number;
  notifier = new Subject();

  constructor(private route: ActivatedRoute, private service: ProductsService) { }

  ngOnInit(): void {
    this.title = 'View Product';
    this.headerTitle = document.getElementById('headerTitle')
    this.headerTitle.innerText = this.title;
    const routeParams = this.route.snapshot.paramMap;
    this.productIdFromRoute = Number(routeParams.get('id'));
    const productSub = this.service.getOneProduct(this.productIdFromRoute).pipe(takeUntil(this.notifier)).subscribe((res) => {
      this.product = res;
    });
  }

  activate(state: boolean) {
    console.log(state)
    this.product.isActive = state;
    console.log(state, this.product, this.productIdFromRoute);
    this.service.updateProduct(this.product, this.productIdFromRoute);
  }

  ngOnDestroy(): void {
    this.notifier.next(1)
    this.notifier.complete()
  }

}
