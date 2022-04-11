import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  title:string|any;
  headerTitle:string|any;
  displayedColumns: string[] = ['id', 'name', 'email','address','phone','remove'];
  dataSource:any;
  active!:string;
  constructor(private route:Router  ,private service:AuthService) { 
    this.title = 'User List';
    this.headerTitle = document.getElementById('headerTitle')
    this.headerTitle.innerText = this.title;
  }

  ngOnInit(): void {
    this.service.login().subscribe(res=>{
      this.dataSource = res;
      console.log(res)
    })
  }

}
