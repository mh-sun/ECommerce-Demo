import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Angular-Project';
  hide: boolean = false;

  ngOnInit() {
  }

  constructor(private router: Router) {
  // on route change to '/login', set the variable showHead to false
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] == '/admin'||event['url'] == '/admin/home'||event['url'] == '/admin/productList') {
          this.hide = false;
        } else {
          // console.log("NU")
          this.hide = true;
        }
      }
    });
  }

}
