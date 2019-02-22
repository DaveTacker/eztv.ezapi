import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TorrentComponent } from './torrent/torrent.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TorrentComponent
  ],
  declarations: [
    TorrentComponent
  ],
  exports: [
  ],
  entryComponents: [],
})
export class ComponentsModule {}
