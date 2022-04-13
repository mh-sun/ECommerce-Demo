import { Component, HostListener } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  scrolled:boolean = false
  title = 'Angular-Project';
  hide: boolean = false;

  ngOnInit() {
  }

  constructor(private router: Router) {
  // on route change to '/login', set the variable showHead to false
    router.events.forEach((event:any) => {
      if (event instanceof NavigationStart) {
        if (event['url'] == '/admin'||event['url'] == '/admin/home'||event['url'] == '/admin/productList') {
          this.hide = false;
        } else {
          this.hide = true;
        }
      }
    });
  }
  @HostListener('window:scroll',['$event']) onScroll(){
    window.scrollY > 0 ? this.scrolled = true: this.scrolled = false
  }
}
