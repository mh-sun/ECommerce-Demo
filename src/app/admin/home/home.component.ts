import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title:string|any;
  headerTitle:string|any;
  totalProduct=0;
  constructor(private route:Router,private service:ProductsService ) { 
  }

  ngOnInit(): void {
    this.title = 'Home';
    this.headerTitle = document.getElementById('headerTitle')
    this.headerTitle.innerText = this.title;

    this.service.getProduct().subscribe(res=>{
      for(let i in res){
        this.totalProduct=+i;
      }
      this.totalProduct=this.totalProduct+1;
    });
  }

}
