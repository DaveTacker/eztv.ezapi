import { Component, OnInit, Input } from '@angular/core';
import { Torrent } from 'src/app/Models/torrent';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-torrent',
  templateUrl: './torrent.component.html',
  styleUrls: ['./torrent.component.css']
})
export class TorrentComponent implements OnInit {
  @Input() torrent: Torrent = new Torrent();

  constructor( public sanitizer: DomSanitizer) {
   }

  ngOnInit() {
  }

  public sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
  public formatBytes(a,b){if(0==a)return"0 Bytes";var c=1024,d=b||2,e=["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"],f=Math.floor(Math.log(a)/Math.log(c));return parseFloat((a/Math.pow(c,f)).toFixed(d))+" "+e[f]}

}
