import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationCancel, NavigationEnd } from '@angular/router';

import { ServerUtilsService } from './services/server-utils.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  private loading: Boolean;
  private retry: Boolean;

  test = 1;

  constructor(private router: Router, private serviceUtils: ServerUtilsService) {
      this.loading = true;
      console.log(this.loading)
  }

  ngOnInit() {
      this.router.events
          .subscribe((event) => {
              if(event instanceof NavigationStart) {
                  this.loading = true;
              }
              else if (
                  event instanceof NavigationEnd ||
                  event instanceof NavigationCancel
                  ) {

                    this.serviceUtils.checkServerHealth().subscribe(
                      response => {
                          //response.status = "ol"
                        if(response.status !== "OK")
                          this.retry = true;
                        else{
                          setTimeout(() => {
                            this.loading = false;
                            this.retry = false;
                          }, 1000)
                        }
                      }
                    );
              }
          });
  }

  reload(){
    window.location.reload();
  }
}
