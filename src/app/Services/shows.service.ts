import { Show } from './../Models/show';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ShowsService {
  public docId = null;

  constructor(private db: AngularFirestore, private route: ActivatedRoute) {
    this.docId = this.route.snapshot.paramMap.get('id');
  }

  // public link(): string {
  //   return document.location.host + '/shows/' + this.docId;
  // }

  public host = document.location.host + '/shows/';

  public set(payload: Show): Promise<any> {
    if (!this.docId) {
      this.docId = this.db.createId();
    }

    console.log('Setting', this.docId, 'with', payload);

    return new Promise((resolve, reject) => {
      this.db
        .collection(this.docId)
        .doc(payload.id)
        .set(payload.toObject())
        .then(() => {
          resolve(true);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  public update(show: Show): void {
    console.log('Updating', this.docId, 'with', show);

    this.db
      .collection(this.docId)
      .doc(show.id)
      .update(show)
      .catch(error => {
        console.error(error);
        alert('An error occurred when trying to update the show information. Try again in a few minutes.');
      });
  }

  public delete(show): void {
    console.log('Deleting', show, 'from', this.docId);
    this.db.collection(this.docId).doc(show.id).delete();
  }

  public get(): Observable<any> {
    console.log(`Fetching shows from ${this.docId}`);
    return this.db.collection(this.docId).valueChanges();
  }
}
