import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, registerLocaleData } from '@angular/common';
import { NgModule, LOCALE_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';
import { WeatherComponent } from './weather/weather.component';
import { WeatherService } from './weather/weather.service';
import { WeatherResolver } from './weather/weather.resolver';

import ptBr from '@angular/common/locales/pt';
registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    CommonModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(AppRoutes)
  ],
  providers: [{provide: LOCALE_ID, useValue: 'pt' },WeatherService, WeatherResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
