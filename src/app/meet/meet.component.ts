import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { Location } from '@angular/common';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestoreDocument, AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable, of, Subscription } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { post } from 'selenium-webdriver/http';

interface Day {
  a: Array<string>,
  b: Array<string>,
  c: Array<string>,
  d: Array<string>,
  e: Array<string>
}

interface User {
  room: string,
  monday: Day,
  tuesday: Day,
  wednesday: Day,
  thursday: Day,
  friday: Day,
  saturday: Day,
  sunday: Day,
}

@Component({
  selector: 'app-meet',
  templateUrl: './meet.component.html',
  styleUrls: ['./meet.component.css']
})
export class MeetComponent implements OnInit {
  room: string;
  name: string;
  notesCollection: AngularFirestoreCollection<Day>;
  noteDoc: AngularFirestoreDocument<Day>;
  notes: Observable<Day[]>;
  note: Observable<Day>;
  sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private location: Location,
    public auth: AuthService
  ) { }

  ngOnInit() {
    this.name = "abby";
    this.getRoom();
    this.notesCollection = this.afs.collection(`${this.room}`, ref => {
      // return ref.orderBy('hearts', 'desc').limit(9).orderBy('content');
      return ref
    })
    this.notes = this.notesCollection.valueChanges();
    this.noteDoc= this.afs.doc(`${this.room}/tduxKv8jfW01GbSHLuko`);

  }

  getRoom(): void {
    this.room = this.route.snapshot.paramMap.get('id');
  }

  onKey(event) {
    this.name = event.target.value;
  }

  makeid() {
    var text = "";
    var possible = "0123456789";
  
    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }

  updateData(event) {
    // Sets user data to firestore on login
    var target = event.target || event.srcElement || event.currentTarget;
    var d = target.attributes.d.nodeValue;
    var p = target.attributes.p.nodeValue;
    this.notesCollection = this.afs.collection(`${this.room}`, ref => {
      // return ref.orderBy('hearts', 'desc').limit(9).orderBy('content');
      return ref
    })
    this.notes = this.notesCollection.valueChanges();

    this.sub = this.notes.subscribe((posts) => {
      const data = posts[0];
      console.log(data[d][p]);
      if (data[d][p].includes(this.name)) {
        data[d][p] = data[d][p].filter(obj => obj !== this.name);
      } else {
        data[d][p].push(this.name);
      }
      this.sub.unsubscribe();
      return this.noteDoc.set(data, { merge: true })
    });

    

  }

}
