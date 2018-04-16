import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { Question } from './../model/question';


@Injectable()
export class ServerUtilsService {
  public API = "https://private-bbbe9-blissrecruitmentapi.apiary-mock.com";

  constructor(private http: Http) { }

  /*
  * Checks the server health
  */
  checkServerHealth() {
    return this.http.get(`${this.API}/health`)
        .map((res:Response)=> res.json());
  }

  /*
  * Shares a page to the specified email
  */
  sharePage(email, page) {
    let data = this.createData(email, page);

    return this.http.get(this.createURL(`${this.API}/questions`, data))
        .map((res:Response)=> res.json());
  }

  /*
  * Joins the base url with the data object to form a valid url for accessing the data.
  */
  createURL(url, data) {
    return [url, Object.keys(data).map(function(key) {
        return [key, data[key]].map(encodeURIComponent).join("=");
    }).join("&")].join(data === {} ? "":"?");
  }

  /*
  * Creates the object with the necessary parameters to form the url for accessing the data.
  */
  private createData(email?, page?){

    let data = {};

    Object.assign(data,
      email ? { destination_email: email } : null,
      page ? { content_url: page } : null
    );

    return data;
  }
}
