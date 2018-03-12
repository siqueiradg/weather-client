import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { WeatherNow } from '../shared/interface/weather-now.interface';
import { WeatherAll } from './../shared/interface/weather-all.interface';

@Injectable()
export class WeatherService{

  private searchWeatherUrl: string;
  private historyWeatherUrl: string;
  private searchCity: string;
  private params: string;

  constructor(private http: HttpClient) {
    this.searchWeatherUrl = '/api/v1/weather/locale/';
    this.historyWeatherUrl = '/api/v1/forecast/locale/';
    this.searchCity = '/api/v1/locale/city?name=';
    this.params = '?token=87ab74f81afff9d6f94880d228543852';
  }

  getWeatherNow(codeCity: string): Observable<WeatherNow> {
    return this.http.get<WeatherNow>( this.searchWeatherUrl + codeCity + '/current' + this.params);
  }

  getWeatherAll(codeCity: number): Observable<WeatherAll> {
    return this.http.get<WeatherAll>( this.historyWeatherUrl + codeCity + '/days/15' + this.params);
  }
}
