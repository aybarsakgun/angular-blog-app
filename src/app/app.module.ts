import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {StoreModule} from '@ngrx/store';
import {HeaderComponent} from './layouts/home/header/header.component';
import {AppRoutingModule} from "./app-routing.module";
import {HomeComponent} from "./layouts/home/home.component";
import {FooterComponent} from "./layouts/home/footer/footer.component";
import {HttpClientModule} from "@angular/common/http";
import {PaginationModule} from "ngx-bootstrap/pagination";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({}, {}),
    AppRoutingModule,
    HttpClientModule,
    PaginationModule.forRoot(),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
