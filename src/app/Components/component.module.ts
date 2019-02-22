import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Http } from '@angular/http';
import { HttpHeaders } from '@angular/common/http'

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class ComponentModule {

  // Shows
  private shows = [
    'https://eztv.io/api/get-torrents?imdb_id=6048596 '
  ]

  constructor(private http: Http) {

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' }).set('Accept', 'application/json');


    this.http.get('https://eztv.io/api/get-torrents?imdb_id=6048596', { headers: headers }).subscribe((result) => {
      console.log(result);
    });
  //   const headers = { 'Content-Type': 'text/xml',
  // 'Accept': 'text/xml', };

//     this.http.get('https://eztv.io/ezrss.xml', { headers: headers, 'responseType': 'text/xml' }).subscribe((result) => {
//       console.log(result);
//     });
  }

  }
