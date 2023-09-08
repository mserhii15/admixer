import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import NavigationComponent from './core/components/navigation/navigation.component';
import SvgComponent from './core/components/svg/svg.component';
import AppComponent from './app.component';

import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    NavigationComponent,
    MatSidenavModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserModule,
    SvgComponent,
    FormsModule,
  ],
})
export default class AppModule {}
