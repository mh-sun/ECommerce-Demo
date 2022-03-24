import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{
  title = 'admin-panel-layout';
  sideBarOpen = true;
  ngOnInit() {
   console.log( document.getElementsByTagName('app-header'))

  }
  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

}
