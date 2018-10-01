import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyServiceService {

  protected swapiUrl = 'https://swapi.co/api/people/';

  constructor(private http: HttpClient) { }

  getCharacter(): Observable<any> {
    const characterNumber = 9;
    return this.http.get(this.swapiUrl + characterNumber + '/');
  }
}
