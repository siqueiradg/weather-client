import { GeneralConfig } from './../shared/config/general-config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { WeatherNow } from '../shared/interface/weather-now.interface';
import { WeatherAll } from './../shared/interface/weather-all.interface';

@Injectable()
export class WeatherService {

  private searchWeatherUrl = '/api/v1/weather/locale/';
  private historyWeatherUrl = '/api/v1/forecast/locale/';
  private searchCity = '/api/v1/locale/city?name=';
  private params: string;

  constructor(private http: HttpClient) {
    this.params = '?token=' + GeneralConfig.tokenClimaTempo.key;
  }

  getWeatherNow(codeCity: string): Observable<WeatherNow> {
    return this.http.get<WeatherNow>( this.searchWeatherUrl + codeCity + '/current' + this.params);
  }

  getWeatherAll(codeCity: number): Observable<WeatherAll> {
    return this.http.get<WeatherAll>( this.historyWeatherUrl + codeCity + '/days/15' + this.params);
  }

  getIdCity(city: string, state: string): Observable<Response> {
    return this.http.get<Response>( this.searchCity + city + '&state=' + state + '&token=' + GeneralConfig.tokenClimaTempo.key);
  }
}
