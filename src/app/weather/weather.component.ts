import { WeatherData } from './../shared/model/weather-data.model';
import { Component, OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { WeatherService } from './weather.service';
import { WeatherNow } from './../shared/interface/weather-now.interface';
import { WeatherAll } from './../shared/interface/weather-all.interface';
import { WeatherTemperature } from '../shared/model/weather-temperature.model';
import { Chart } from 'chart.js';
import { CityFavorite } from '../shared/model/city-favorite';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-weather',
  templateUrl: 'weather.component.html'
})

export class WeatherComponent implements OnInit {

  private subs: Subscription;
  weatherNow: WeatherNow;
  weatherAll: WeatherAll;
  weatherData: WeatherData;
  chart = [];
  bookmarks = [];

  constructor(
    private weatherService: WeatherService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) {
    this.weatherData = new WeatherData();
    this.weatherData.temperature = new WeatherTemperature();
  }

  ngOnInit() {
    this.loadWeatherNow();
    this.loadBookmarks();
  }

  loadWeatherNow(): void {
    this.subs = this.route.data.subscribe(
      (data: WeatherNow) => {
        this.weatherNow = data[0];
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
    let dataMin = [];
    let dataMax = [];
    let labels = [];

    array.slice(0, 7).forEach(
      (data) => {
        dataMin.push(data.temperature.min);
        dataMax.push(data.temperature.max);
        const date = new Date(data.date);
        labels.push((date.getDate() + 1) + '/' +  (date.getMonth() + 1));
      }
    );

    this.loadChart(labels, dataMin, dataMax)
  }

  loadChart(labels, dataMin, dataMax): void {
    Chart.defaults.global.defaultFontColor = "#fff";
    this.chart = new Chart('chartTemperature', {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            data: dataMin,
            borderColor: "#a4d5fa",
            backgroundColor: "rgba(0,0,0,.40)",
            fill: false
          },
          {
            data: dataMax,
            borderColor: "#ff0000",
            backgroundColor: "rgba(0,0,0,.40)",
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

  loadBookmarks(): void {
    if (localStorage.getItem('offlineData') != undefined) {
      this.bookmarks = JSON.parse(localStorage.getItem('offlineData'));
    }
  }

  addCity(): void {
    let favorite = new CityFavorite();
    favorite.code = this.weatherNow.id;
    favorite.name = this.weatherNow.name + ' - ' + this.weatherNow.state;
    this.bookmarks.push(favorite);
    localStorage.setItem('offlineData', JSON.stringify(this.bookmarks));
  }

  open(content) {
    this.modalService.open(content);
  }

}
