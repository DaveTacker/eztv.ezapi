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

  set(payload: object): Promise<any> {
    this.docId = this.db.createId();
    console.log('Setting', this.docId, 'With', payload);

    return new Promise((resolve, reject) =>  {
      this.db.collection('shows').doc(this.docId).set(payload).then(() => {
        resolve(true);
      }).catch(error => {
        reject(error);
      });
    });
  }

  update(payload: object): Promise<any> {
    console.log('Updating', this.docId, 'With', payload);

    return new Promise((resolve, reject) =>  {
      this.db.collection('shows').doc(this.docId).update(payload).then(() => {
        resolve(true);
      }).catch(error => {
        reject(error);
      });
    });
  }

  get(): Observable<any> {
    this.docId = id;

    if (!this.docId) {
      this.docId = this.route.snapshot.paramMap.get('id');
    }

    return this.db.collection('shows', show => show.where('id', '==', this.docId)).valueChanges();
  }
}
