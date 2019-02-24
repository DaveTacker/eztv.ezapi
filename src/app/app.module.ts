import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ActivatedRoute } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFirestore } from '@angular/fire/firestore';
import { TorrentComponent } from './Components/torrent/torrent.component';


@NgModule({
  declarations: [
    AppComponent,
    TorrentComponent
  ],
  imports: [
    HttpModule,
    FormsModule,
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [AngularFirestore, ActivatedRoute],
  bootstrap: [AppComponent]
})
export class AppModule { }
