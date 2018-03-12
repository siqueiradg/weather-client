import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BingService {

  private urlApi = 'https://api.cognitive.microsoft.com/bing/v7.0/images/search?q=';

  constructor(private http: HttpClient) {}

  getBackgroundCity(city: string): Observable<Response> {
    return this.http.get<Response>(
      this.urlApi + city, { headers: new HttpHeaders().set('Ocp-Apim-Subscription-Key', '5859b320edc7405293ccb959a4e43a63' ) }
    );
  }
}
