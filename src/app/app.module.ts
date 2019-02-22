import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TorrentComponent } from './Components/torrent/torrent.component';
import { Http, HttpModule } from '@angular/http';
//import { ComponentsModule } from './Components/components.module';

@NgModule({
  declarations: [
    AppComponent,
    TorrentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
