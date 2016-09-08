import { provideRouter, RouterConfig, Route } from '@angular/router';

import { MainComponent } from './main/main.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

export const routes: RouterConfig = [
  {path: '', component: MainComponent, children: [{
      component: HomeComponent,
      path: '',
    },
    {path: 'about', component: AboutComponent},
  ]},
];

export const APP_ROUTER_PROVIDERS: Route[] = [
  provideRouter(routes),
];
