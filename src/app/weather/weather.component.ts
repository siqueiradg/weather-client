import { Component, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';

import { WeatherService } from './weather.service';
import { WeatherNow } from './../shared/interface/weather-now.interface';
import { WeatherAll } from './../shared/interface/weather-all.interface';
import { WeatherTemperature } from '../shared/model/weather-temperature.model';
import { WeatherData } from './../shared/model/weather-data.model';
import { Chart } from 'chart.js';
import { BingService } from '../shared/services/bing.service';
import { ToastService } from '../shared/services/toast.service';

@Component({
  selector: 'app-weather',
  templateUrl: 'weather.component.html'
})

export class WeatherComponent implements OnInit {

  @ViewChild('searchCity') searchElementRef: ElementRef;

  private subs: Subscription;
  weatherNow: WeatherNow;
  weatherAll: WeatherAll;
  weatherData: WeatherData;
  urlBackground: string;
  chart = [];

  constructor(
    private toast: ToastService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private bing: BingService,
    private weatherService: WeatherService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.weatherData = new WeatherData();
    this.weatherData.temperature = new WeatherTemperature();
  }

  ngOnInit() {
    this.loadWeatherNow();

    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ['(cities)'],
        componentRestrictions: { country: 'BR' }
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {

          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          this.searchElementRef.nativeElement.value = place.name;

          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
        });
      });
    });
  }

  loadBackground(city: string): void {
    this.bing.getBackgroundCity(city).subscribe(
      (data: any) => {
        this.urlBackground = data.value[0].contentUrl;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  loadWeatherNow(): void {
    this.subs = this.route.data.subscribe(
      (data: WeatherNow) => {
        this.weatherNow = data[0];
        this.loadBackground(this.weatherNow.name);
        this.loadWeatherAll();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  loadWeatherAll(): void {
    this.weatherService.getWeatherAll(this.weatherNow.id).subscribe(
      (data: WeatherAll) => {
        this.weatherAll = data;
        this.weatherData = data.data[0];
        this.loadDataChart(this.weatherAll.data);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  loadDataChart(array: any[]): void {
    const dataMin = [];
    const dataMax = [];
    const labels = [];

    array.slice(0, 7).forEach(
      (data) => {
        dataMin.push(data.temperature.min);
        dataMax.push(data.temperature.max);
        const date = new Date(data.date);
        labels.push((date.getDate() + 1) + '/' +  (date.getMonth() + 1));
      }
    );

    this.loadChart(labels, dataMin, dataMax);
  }

  loadChart(labels, dataMin, dataMax): void {
    Chart.defaults.global.defaultFontColor = '#fff';
    this.chart = new Chart('chartTemperature', {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            data: dataMin,
            borderColor: '#a4d5fa',
            backgroundColor: 'rgba(0,0,0,.40)',
            fill: false
          },
          {
            data: dataMax,
            borderColor: '#ff0000',
            backgroundColor: 'rgba(0,0,0,.40)',
            fill: false
          },
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }],
        }
      }
    });
  }

  changeLocation(city, state): void {
    this.weatherService.getIdCity(city, state).subscribe(
      (data) => {
        this.changeWeatherNow(data);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  changeWeatherNow(city: any): void {
    if (city[0].id !== undefined) {
      this.weatherService.getWeatherNow(city[0].id).subscribe(
        (data: WeatherNow) => {
          this.weatherNow = data;
          this.loadBackground(data.name);
          this.loadWeatherAll();
        },
        (error: any) => {
          console.log(error);
        }
      );
    }
  }

  addCity(): void {
    const data = JSON.parse(localStorage.getItem('offlineData'));
    if (data !== this.weatherNow.id) {
      localStorage.setItem('offlineData', '' + this.weatherNow.id);
      this.toast.showToast('Adicionada como favorita');
    } else {
      localStorage.clear();
      this.toast.showToast('Removido');
    }
  }

  isFavorite(): boolean {
    const data = JSON.parse(localStorage.getItem('offlineData'));
    if (data === this.weatherNow.id) {
      return true;
    }
    return false;
  }

  getCondition(icon): string {
    switch (icon) {
      case '1':
        return 'Que tal uma piscina ou praia?';
      case '2':
        return 'O clima está bom para atividades físicas.';
      case '3':
        return 'Se for sair leve o guarda-chuva!';
      case '4':
        return 'Se for sair leve o guarda-chuva!';
      case '5':
        return 'Se for sair leve o guarda-chuva!';
      case '6':
        return 'Chuva muito forte, melhor ficar em casa!';
      case '9':
        return 'Ótimo dia para uma caminhada!';
      default:
        return 'Que tal uma atividade alternativa hoje?';
    }
  }

}
