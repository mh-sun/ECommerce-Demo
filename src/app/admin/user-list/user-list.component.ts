import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogService } from 'src/app/core/services/log.service';

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
  constructor(private route:Router  ,private service:LogService) { 
    this.title = 'User List';
    this.headerTitle = document.getElementById('headerTitle')
    this.headerTitle.innerText = this.title;
  }

  ngOnInit(): void {
    this.service.getUsers().subscribe((res:any)=>{
      this.dataSource = res;
      console.log(res)
    })
  }

}
