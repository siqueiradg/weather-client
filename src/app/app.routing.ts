import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WeatherComponent } from './weather/weather.component';
import { WeatherResolver } from './weather/weather.resolver';

export const AppRoutes: Routes = [
  {
      path: '',
      redirectTo: 'weather',
      pathMatch: 'full',
  },
  {
    path: 'weather',
    component: WeatherComponent,
    resolve: [WeatherResolver],
  }
]
