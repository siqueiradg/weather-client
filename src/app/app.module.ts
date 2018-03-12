import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, registerLocaleData } from '@angular/common';
import { NgModule, LOCALE_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AgmCoreModule } from '@agm/core';

import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';
import { WeatherComponent } from './weather/weather.component';
import { WeatherService } from './weather/weather.service';
import { WeatherResolver } from './weather/weather.resolver';
import { BingService } from './shared/services/bing.service';
import { ToastService } from './shared/services/toast.service';

import ptBr from '@angular/common/locales/pt';
registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCrtNwYl8uCUMDTL5khbbjkQcBUM8TSAkI',
      libraries: ['places']
    }),
    HttpClientModule,
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(AppRoutes)
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'pt' },
    WeatherService,
    WeatherResolver,
    BingService,
    ToastService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
