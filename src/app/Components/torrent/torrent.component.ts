import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Torrent } from 'src/app/Models/torrent';
import * as moment from 'moment';

@Component({
  selector: 'app-torrent',
  templateUrl: './torrent.component.html',
  styleUrls: ['./torrent.component.css']
})
export class TorrentComponent implements OnInit {
  @Input() torrent: Torrent = new Torrent();
  @Input() filter = '';

  constructor(public sanitizer: DomSanitizer) {}

  ngOnInit() {}

  public sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  public formatBytes(a, b) {
    if (0 === a) {
      return '0 Bytes';
    }

    const c = 1024;
    const d = b || 2;
    const e = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const f = Math.floor(Math.log(a) / Math.log(c));
    return parseFloat((a / Math.pow(c, f)).toFixed(d)) + ' ' + e[f];
  }

  public cleanTitle(title: string): string {
    return title.match(/(.*)(S\d+E\d+)/g).toString();
  }
}
