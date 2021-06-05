import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NumberFormatPipe } from './pipe/number-format.pipe';
import { SortPipe } from './pipe/sort-order.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SortPipe,
    NumberFormatPipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
