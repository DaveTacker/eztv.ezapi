import { TorrentService } from './../../Services/torrent.service';
import { Http } from '@angular/http';
import { Show } from './../../Models/show';
import { Torrent } from './../../Models/torrent';
import { Component, OnInit } from '@angular/core';
import { ShowsService } from './../../Services/shows.service';

@Component({
  selector: 'app-shows',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.scss'],
  providers: [ShowsService]
})

export class ShowsComponent implements OnInit {
  public torrents: Array<Torrent> = [];
  public addInput = '';
  public lastTorrentParsed: Torrent;
  public shows: Array<Show> = [];
  public progressParent: HTMLElement;
  public progressbar: HTMLElement;
  public fetchBtn: HTMLElement;
  public limit = '10';
  public filter = '';
  public year = new Date().getFullYear();

  constructor(private http: Http, public db: ShowsService, private torrentService: TorrentService) { }

  ngOnInit() {
    this.progressbar = document.getElementById('progressbar');
    this.progressParent = document.getElementById('progressParent');
    this.fetchBtn = document.getElementById('fetchBtn');
    this.subscribe();

    // Hide the progress bar
    this.progressParent.style.display = 'none';

    // Fetch all of the stored torrent data
    this.torrents = this.torrentService.torrents;
    console.log('this.torrents', this.torrents);

    // this.start();
  }

  /**
   * Start fetching all the torrents with a 1.5 second delay between searches
   *
   * @memberof ShowsComponent
   */
  async start() {
    this.fetchBtnStart();
    const waitFor = ms => new Promise(r => setTimeout(r, ms));
    const asyncForEach = async (array, callback) => {
      for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
      }
    };

    let iterator = 0;
    this.progressbar.setAttribute('aria-valuenow', '0');
    this.progressbar.style.width = '0%';
    this.progressbar.setAttribute('aria-valuemax', this.shows.length.toString());

    const fetchAll = async () => {
      await asyncForEach(this.shows, async show => {
        await waitFor(500);

        this.updateVisibleProgress(++iterator);
        this.grabTorrent(show.id, iterator);
      });
    };

    fetchAll();
  }

  /**
   * Subscribe to the torrents list
   *
   * @memberof ShowsComponent
   */
  subscribe(): void {
    if (this.db.docId) {
      this.db.get().subscribe((shows: any) => {
        console.log(shows);
        this.shows = shows;
      });
    }
  }

  getTorrentData(torrentId: string) {
    return this.http.get(`https://eztv.io/api/get-torrents?imdb_id=${torrentId}&limit=${this.limit}`);
  }

  /**
   * 1) Get the show Id
   * 2) fetch the show information from EZTV
   * 3) parse the show name
   * 4) Add all torrents to the view
   * 5) Save the show to Firestore
   * 6) Sort the view
   *
   * @memberof ShowsComponent
   */
  saveShow() {
    this.fetchBtnStart();
    let showId = this.addInput;
    const input = this.addInput.split('/');

    // #1
    input.forEach((value: string, index: number) => {
      if (value.includes('tt')) {
        showId = value.replace(/^\D+/g, '');
      }
    });

    // #2
    this.getTorrentData(showId).subscribe((result: any) => {
      this.fetchBtnStop();
      const response = JSON.parse(result._body);
      this.addInput = '';

      if (response.torrents && response.torrents.length) {
        // #3
        const torrent = response.torrents[0];
        const show = new Show(torrent);
        show.id = showId;

        // #4
        response.torrents.forEach((torrent: Torrent) => {
          torrent.date = new Date(torrent.date_released_unix * 1000);
          this.torrents.push(torrent);
        });

        // #5
        this.db.set(show);
        this.subscribe();

        // #6
        this.sortTorrents();
      } else {
        this.fetchBtnStop();
        alert('No torrents for Id ' + showId + '!');
      }
    });
  }

  /**
   * Grab torrent information, add it to the view, and sort
   *
   * @private
   * @param {string} torrentId
   * @param {number} [iterator]
   * @memberof ShowsComponent
   */
  private grabTorrent(torrentId: string, iterator?: number): void {
    this.getTorrentData(torrentId).subscribe((result: any) => {
      const response = JSON.parse(result._body);

      if (response.torrents && response.torrents.length) {
        response.torrents.forEach((torrent: Torrent) => {
          torrent.date = new Date(torrent.date_released_unix * 1000);
          this.torrents.push(torrent);
          this.torrentService.addTorrent(torrent);
        });

        this.sortTorrents();
        this.updateVisibleProgress(iterator);
      } else {
        this.fetchBtnStop();
        alert('No torrents for Id ' + torrentId + '!');
      }
    });
  }

  /**
   * Update the progress bar
   *
   * @private
   * @param {number} iterator
   * @memberof ShowsComponent
   */
  private updateVisibleProgress(iterator: number): void {
    const percent = (iterator / this.shows.length) * 100 + '%';
    this.progressbar.style.width = percent;
    this.progressbar.setAttribute('aria-valuenow', (iterator * 1000).toString());

    if (iterator === this.shows.length) {
      document.getElementsByClassName('progress')[0].classList.add('d-none');
      this.fetchBtnStop();
    }
  }

  fetchBtnStart() {
    this.progressParent.style.display = 'flex';
    this.fetchBtn.innerHTML = '<i class="fas fa-fw fa-spin fa-sync-alt"></i>';
  }

  fetchBtnStop() {
    this.progressParent.style.display = 'none';
    this.fetchBtn.innerHTML = '<i class="fas fa-fw fa-sync-alt"></i> Fetch';
  }

  sortTorrents() {
    this.torrents = this.torrents.sort(
      (a: Torrent, b: Torrent): number => {
        return a.date > b.date ? -1 : 1;
      }
    );
  }

  copyUrl(): void {
    const copyText = document.getElementById('pageUrl') as HTMLInputElement;
    copyText.select();
    document.execCommand('copy');

    // document.getElementById('copyUrlButton').tooltip('show');

    // setTimeout(() => {
    //   document.getElementById('copyUrlButton').tooltip('hide');
    // }, 1500);
  }
}
