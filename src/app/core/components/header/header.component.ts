import { Component, Input } from '@angular/core';
import { SideNavService } from '../../services/side-nav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  logUser:String|null = ''
  constructor(private sidenavService:SideNavService){
    this.logUser = localStorage.getItem('logStatus')
  }
  sidenavToggle(){
    this.sidenavService.sideNav.next(true)
  }
  logout(){
    localStorage.setItem('logStatus','')
  }
}
