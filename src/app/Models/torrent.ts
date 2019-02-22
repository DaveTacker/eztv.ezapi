// import { Sanitizer } from '@angular/core';
// import { SanitizerFn } from '@angular/core/src/render3/interfaces/sanitization';
import { DomSanitizer, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

export class Torrent {
  public date_released_unix = 0;
  public date = new Date();
  public episode = '';
  public large_screenshot = '';
  public magnet_url: any;
  public torrent_url = '';
  public title = '';
  public small_screenshot = '';
  public size_bytes = '1024';
  // constructor(private sanitization: DomSanitizer, data: any) {
  //   this.magnet_url = this.sanitization.bypassSecurityTrustStyle(data.magnet_url);
  // }
}
