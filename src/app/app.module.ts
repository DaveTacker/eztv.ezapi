import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFirestore } from '@angular/fire/firestore';
import { TorrentComponent } from './Components/torrent/torrent.component';
import { ShowsComponent } from './Pages/shows/shows.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    TorrentComponent,
    ShowsComponent
  ],
  imports: [
    NgbModule,
    HttpModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
