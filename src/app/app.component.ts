import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Torrent } from './Models/torrent';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public torrents: Array<Torrent> = [];
  public addInput = '';


  // Shows
  private shows = [
    '1520211', // the walking dead
    '3743822', // fear the walking dead
    '3501074', // madam secretary
  ];

  constructor(private http: Http) {
    this.start();
}

async start() {

  const waitFor = (ms) => new Promise(r => setTimeout(r, ms))
const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

const start = async () => {
  await asyncForEach(this.shows, async (torrentId) => {
    await waitFor(1500);

    this.getTorrentData(torrentId).subscribe((result: any) => {
          const response = JSON.parse(result._body);
          // console.log(response);

          if (response.torrents && response.torrents.length) {
            console.log(response.torrents);

            response.torrents.forEach((torrent: Torrent) => {
              // console.log(torrent);
              // if (torrent.date_released_unix) {

              // console.log(new Date(torrent.date_released_unix * 1000));
              torrent.date = new Date(torrent.date_released_unix * 1000);

              this.torrents.push(torrent);

            // }
               });

               this.torrents = this.torrents.sort((a: Torrent, b: Torrent): number => {
                 return a.date > b.date ? -1 : 1;
               });
              }

        });
  })
  // console.log('Done')
}

start()
}
  getTorrentData(torrentId: string) {
    return this.http.get(`https://eztv.io/api/get-torrents?imdb_id=${torrentId}`);
  }

}
