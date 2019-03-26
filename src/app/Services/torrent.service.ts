import { Torrent } from './../Models/torrent';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TorrentService {

  constructor() { }

  private torrentsArr: Array<Torrent> = [];

  get torrents(): Array<Torrent> {
    const torrents = localStorage.getItem('torrents');

    if (torrents) {
      this.torrentsArr = JSON.parse(torrents);
    }

    return this.torrentsArr;
  }

  public addTorrent(torrent: Torrent) {
    this.torrentsArr.push(torrent);
    this.set();
  }

  private set() {
    localStorage.setItem('torrents', JSON.stringify(this.torrentsArr));
  }
}
