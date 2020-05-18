import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'saharsha';
  pageTitle: string;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private titleService: Title){
  }
  ngOnInit(){
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      var rt = this.getChild(this.activatedRoute);

      rt.data.subscribe(data => {
        this.titleService.setTitle(data.title);
        this.pageTitle = data.title;
      });
    });
  }
  getChild(activatedRoute: ActivatedRoute){
        if (activatedRoute.firstChild) {
          return this.getChild(activatedRoute.firstChild);
        } else {
          return activatedRoute;
        }
      }

}
