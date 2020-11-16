import { Component, OnInit } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

import * as firebase from 'firebase';
import { from } from 'rxjs';

export interface Item { nombre: string; url: string; }

@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.component.html',
  styles: []
})
export class FotosComponent implements OnInit {

  private itemsCollection: AngularFirestoreCollection<Item>;
  itemsObs: Observable<Item[]>;
  items: Item[] = [];

  constructor(private angularFirestore: AngularFirestore) {

    // const storageRef = firebase.storage().ref("img")
    // // Now we get the references of these images
    // storageRef.listAll().then(function(result) {
    //   // this.items = result;
    //   // console.log(`Result : ${result}`);
    //   result.items.forEach(function(imageRef) {
    //     // And finally display them
    //     console.log(`Image ref : ${imageRef}`);
    //     displayImage(imageRef);
    //   });
    // }).catch(function(error) {
    //   // Handle any errors
    // });

    // function displayImage(imageRef) {
    //   console.log(`Name : ${imageRef.name}`);
    //   imageRef.getDownloadURL().then(function(uri) {
    //     console.log(`URL : ${uri}`);
    //   }).catch(function(error) {
    //     // Handle any errors
    //   });
    // }

    this.itemsCollection = angularFirestore.collection<Item>('img');
    this.itemsObs = this.itemsCollection.valueChanges();
  }

  ngOnInit() {
  }

}
