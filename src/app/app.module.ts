import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { NgxSpinnerModule } from "ngx-spinner";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BiddingComponent } from './bidding/bidding.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { fakeBackendProvider } from './localstorage/fake-backend';
import { ErrorInterceptor } from './localstorage/error.interceptor';
import { JwtInterceptor } from './localstorage/jwt.interceptors';
import { LoginComponent } from './login/login.component';
import { PlayerComponent } from './player/player.component';
import { RegisterComponent } from './register/register.component';
import { TeamComponent } from './team/team.component';
import { AlertComponent } from './alert/alert.component';
import { HeaderafterloginComponent } from './headerafterlogin/headerafterlogin.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TeamComponent,
    PlayerComponent,
    BiddingComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent,
    HeaderafterloginComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    Ng2GoogleChartsModule,
    NgxSpinnerModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
