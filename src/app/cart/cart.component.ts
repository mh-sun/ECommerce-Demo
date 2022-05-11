import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { Cart } from '../core/models/cart-product.model';
import { Order } from '../core/models/order.model';
import { User } from '../core/models/user.model';
import { CartApiService } from '../core/services/cart-api.service';
import { LogService } from '../core/services/log.service';
import { OrderService } from '../core/services/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnDestroy{

  public products : Cart[] = [];
  public grandTotal : number = 0;
  public user: User|null = null;
  public deliveryCharge:number = 100

  // public name:string = ''
  public nameToggle:boolean = false
  // public address:string = ''
  public addrToggle:boolean = false
  // public phone:string = ''
  public phnToggle:boolean = false
  // public email:string = ''
  public emlToggle:boolean = false

  public orderForm = this.fb.group({
    name:['',[
      Validators.required,Validators.minLength(7)
    ]],
    address:['',[
      Validators.required,Validators.minLength(7)
    ]],
    phone:['',[
      Validators.required,Validators.minLength(11)
    ]],
    email:['',[
      Validators.required,Validators.minLength(6),Validators.email
    ]],
  })

  public subOff$ = new Subject()
  
  constructor(
    private cartService : CartApiService,
    private router:Router,
    private logger:LogService,
    private orderService:OrderService,
    private snackBar:MatSnackBar,
    private fb:FormBuilder
  ) {
    this.logger.loggedUser.pipe(takeUntil(this.subOff$))
    .subscribe({
      next:u=>{
        this.user = u
        if(this.user){
          this.orderForm.value.name = this.user.name.firstname + ' ' + this.user.name.lastname
          this.orderForm.value.address = u?.address.number+', '+u?.address.street+', '+u?.address.city
          this.orderForm.value.phone = u?.phone+''
          this.orderForm.value.email = u?.email+''
        }
      },
      error:(err)=>{
        console.log(err)
      },
      complete:()=>{
        console.log("Complete")
      }
    })

    this.cartService.cartSubject.pipe(takeUntil(this.subOff$))
    .subscribe({
      next:(res)=>{
        console.log(res)
        this.products = res
        this.grandTotalPrice()
      },
      error:(err)=>{
        console.log(err)
      },
      complete:()=>{
        console.log("Complete")
      }
    })
  }

  ngOnDestroy(): void {
    this.subOff$.next(1)
    this.subOff$.complete()
  }

  grandTotalPrice() {
    this.grandTotal = 0
    this.products.forEach(cp=>{
      this.grandTotal += (cp.total.price*cp.quantity)
    })
  }

  removeItem(item: Cart){
    console.log(item)
    this.cartService.removeCartItem(item);
  }

  emptycart(){
    this.cartService.clearCart();
  }

  checkOut(){
    let elem = document.getElementById('checkout')
    elem?.classList.contains('checkoutInActive')?
      elem.classList.remove('checkoutInActive'):
      elem?.classList.add('checkoutInActive')
  }

  getTotal(){
    return (this.grandTotal + this.deliveryCharge).toFixed(2)
  }

  makePayment(isValid:boolean){
    if(!isValid) return
    
    let order:Order = this.createOrder()

    if(this.user){
      this.user.orders.push(order.id)
      this.logger.loggedUser.next(this.user)
    }

    this.orderService.postOrder(order)
    
    this.cartService.clearCart()
    this.router.navigate(['cart/payment'])
  }

  createOrder(): Order {
    let products = this.getProductDetailsForOrder()
    let order:Order = {
      id:Math.floor(Math.random()*100000).toString(),
      userId:this.user?this.user.id:null,
      payment:{
        subtotal:this.grandTotal,
        shipping:this.deliveryCharge
      },
      name:this.orderForm.value.name,
      address:this.orderForm.value.address,
      phone:this.orderForm.value.phone,
      email:this.orderForm.value.email,
      date:(new Date()).toDateString(),
      status:"Payment Pending",
      products:products
    }
    return order
  }

  getProductDetailsForOrder() {
    let products:any = []
    this.products.forEach(p=>{
      let obj = {
        title:p.title,
        image:p.image,
        productId:p.id,
        variation:p.variation,
        quantity:p.quantity,
      }
      products.push(obj)
    })
    return products
  }

  nameChange(){    
    this.nameToggle = !this.nameToggle
    return this.nameToggle
  }

  addrChange(){    
    this.addrToggle = !this.addrToggle
    return this.addrToggle
  }

  emailChange(){
    this.emlToggle = !this.emlToggle
    return this.emlToggle
  }

  phnChange(){
    this.phnToggle = !this.phnToggle
    return this.phnToggle
  }

  getFullName(){
    return this.user?.name.firstname+' '+this.user?.name.lastname
  }

  public showSnackBar(message:string, time:number){
    this.snackBar.open(message, "Close", {
      duration:time
    })
  }
}