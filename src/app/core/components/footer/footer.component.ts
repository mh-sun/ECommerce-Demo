import { Component, Input } from '@angular/core';
import { SideNavService } from '../../services/side-nav.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  constructor(private sidenavService:SideNavService){
  }
  sidenavToggle(){
    this.sidenavService.sideNav.next(true)
  }
}