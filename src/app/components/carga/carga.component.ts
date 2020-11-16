import { Component, OnInit } from '@angular/core';
import { CargaImagenesService } from 'src/app/services/carga-imagenes.service';
import { FileItem } from 'src/app/models/file-item/file-item';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styles: []
})
export class CargaComponent implements OnInit {

  estaSobreElemento = false;
  archivos: FileItem[] = [];

  constructor( private cargaImagenesService: CargaImagenesService ) { }

  ngOnInit() { }

  cargarImagenes( ) {
    this.cargaImagenesService.cargarImagenesFirebase(this.archivos);
  }

  limpiarImagenes( ) {
    // this.cargaImagenesService.cargarImagenesFirebase(this.archivos);
    this.archivos = [];
  }
}
