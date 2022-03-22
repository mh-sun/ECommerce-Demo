import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  logUser:String|null = ''
  constructor(){
    this.logUser = localStorage.getItem('logStatus')
  }
  
}
