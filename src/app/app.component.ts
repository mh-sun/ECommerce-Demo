import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { SideNavService } from './core/services/side-nav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('drawer') drawer!:MatDrawer

  title = 'Angular-Project';

  constructor(private sidenavService:SideNavService){
    this.sidenavService.sideNav.subscribe({
      next:(value)=>{
        if(value)this.drawer.toggle()        
      }
    })
  }
}
