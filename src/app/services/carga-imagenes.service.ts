import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

import { FileItemToSaveInterface, FileItem } from '../models/file-item/file-item';

@Injectable({
  providedIn: 'root'
})
export class CargaImagenesService {

  private CARPETA_IMAGENES = 'img';

  constructor( private db: AngularFirestore) { }

  private guardarImagen( imagen: { nombre: string, url: string } ) {
      this.db.collection(`/${ this.CARPETA_IMAGENES}`).add( imagen );
  }

  cargarImagenesFirebase( imagenes: FileItem[]) {
    console.log(imagenes);
    // Con la siguiente línea obtenemos una referencia al storage
    const storageRef = firebase.storage().ref();

    for (const item of imagenes) {

      item.estaSubiendo = true;
      if ( item.progreso >= 100 ) {
        continue;
      }

      const uploadTask: firebase.storage.UploadTask =
        storageRef.child(`${ this.CARPETA_IMAGENES }/${ item.nombreArchivo}`).put( item.archivo );

      uploadTask.on( firebase.storage.TaskEvent.STATE_CHANGED,
        ( snapshot: firebase.storage.UploadTaskSnapshot ) => {
          item.progreso = ( snapshot.bytesTransferred / snapshot.totalBytes ) * 100;
        },
        ( error ) => console.error('Error al subir archivo', error),
        () => {
          console.log('Imagen cargada correctamente');
          // item.url = uploadTask.snapshot.downloadURL;
          // item.url = uploadTask.snapshot.storageReference?.downloadURL;
          storageRef.child(`${ this.CARPETA_IMAGENES }/${ item.nombreArchivo}`).getDownloadURL().then( element => {
              item.url = element;
              console.log('URL : ' + item.url);
              item.estaSubiendo = false;
              this.guardarImagen( { nombre: item.nombreArchivo, url: item.url } );
            });
        }
      );
    }

  }
}
