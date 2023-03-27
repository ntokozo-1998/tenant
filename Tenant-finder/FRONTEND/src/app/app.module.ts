import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LandingComponent } from './landing/landing.component';
import { RentalsComponent } from './components/rentals/rentals.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormComponent } from './components/form/form.component';
import { TenantsComponent } from './components/tenants/tenants.component';
import { LandlordComponent } from './components/landlord/landlord.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    LandingComponent,
    RentalsComponent,
    FooterComponent,
    TenantsComponent,
    LandlordComponent
  
  ],

  imports: 
  [BrowserModule, 
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    IonicModule.forRoot(), 
    AppRoutingModule],

  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
