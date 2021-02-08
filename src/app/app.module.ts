import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { CustomFormsModule } from 'ng2-validation'
import { StorageServiceService } from './services/storage-service.service';
import { ShareModule } from './components/share/share.module';
import { GameService } from './services/game.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HashService } from './services/hash.service';
import { HistoryService } from './services/history.service';
import { AuthServiceService } from './services/auth-service.service';
import { InterceptorService, UnauthorizedInterceptor } from './services/interceptor.service';
import { AuthGuardService } from './services/auth-guard.service';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    CustomFormsModule,
    ShareModule,
    HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    StorageServiceService,
    GameService,
    HashService,
    HistoryService,
    AuthServiceService,
    AuthGuardService,
    InterceptorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,

    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UnauthorizedInterceptor,
      multi: true
    },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
