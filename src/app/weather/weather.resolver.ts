import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { WeatherService } from './weather.service';
import { WeatherNow } from './../shared/interface/weather-now.interface';

@Injectable()
export class WeatherResolver implements Resolve<WeatherNow> {

    constructor(private service: WeatherService) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
        ): Observable<any>|Promise<any>|any {

            const data = JSON.parse(localStorage.getItem('offlineData'));
            if (data != undefined || data != null) {
              return this.service.getWeatherNow(data[0].code);
            } else {
              return this.service.getWeatherNow('5090');
            }
          }
}
