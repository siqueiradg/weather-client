import { WeatherData } from './../shared/model/weather-data.model';
import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { WeatherService } from './weather.service';
import { WeatherNow } from './../shared/interface/weather-now.interface';
import { WeatherAll } from './../shared/interface/weather-all.interface';
import { WeatherTemperature } from '../shared/model/weather-temperature.model';

@Component({
  selector: 'app-weather',
  templateUrl: 'weather.component.html'
})

export class WeatherComponent implements OnInit {

  private subs: Subscription;
  weatherNow: WeatherNow;
  weatherAll: WeatherAll;
  weatherData: WeatherData;

  constructor(
    private weatherService: WeatherService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.weatherData = new WeatherData();
    this.weatherData.temperature = new WeatherTemperature();
  }

  ngOnInit() {
    this.loadWeatherNow();
  }

  loadWeatherNow(): void {
    this.subs = this.route.data.subscribe(
      (data: WeatherNow) => {
        this.weatherNow = data[0];
        this.loadWeatherDate();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  loadWeatherDate(): void {
    this.weatherService.getWeatherAll(this.weatherNow.id).subscribe(
      (data: WeatherAll) => {
        this.weatherAll = data;
        this.weatherData = data.data[0];
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  changeBackground(city: string): void {}
}
