import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CoreModule } from "./core/core.module";
import { HttpClientModule } from "@angular/common/http";
import { environment } from "../environments/environment";
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';
import {effects} from "./store/effects";
import {ROOT_REDUCERS} from "./store/reducers";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CoreModule.forRoot(environment),
    StoreModule.forRoot(ROOT_REDUCERS, {
      metaReducers: !environment.production ? [] : [],
      runtimeChecks: {
        strictActionImmutability: false,
        strictStateImmutability: false,
      },
    }),
    StoreRouterConnectingModule.forRoot({ routerState: RouterState.Full }),
    EffectsModule.forRoot(effects),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
