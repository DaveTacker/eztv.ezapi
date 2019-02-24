import { Torrent } from './torrent';

export class Show {
  id = '';
  title = '';
  added = new Date();

  constructor(data: Torrent) {
    this.title = this.cleanTitle(data.title);
  }

  private cleanTitle(title: string): string {
    const myRegexp = /(.+)\sS/g;
    const match = myRegexp.exec(title);
    return match[0].toString().substr(0, match[0].length - 2);
  }
}
