import { Component, OnInit } from '@angular/core';
import { CargaImagenesService } from 'src/app/services/carga-imagenes.service';
import { FileItem } from 'src/app/models/file-item/file-item';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styles: []
})
export class CargaComponent implements OnInit {

  archivos: FileItem[] = [];

  constructor( private cargaImagenesService: CargaImagenesService ) { }

  ngOnInit() { }

  cargarImagenes( ) {
    this.cargaImagenesService.cargarImagenesFirebase(this.archivos);
    // this.archivos.push(new FileItem('NocheVieja2020.jpg', true, 75))
  }
  limpiarImagenes( ) {
    // this.cargaImagenesService.cargarImagenesFirebase(this.archivos);
    this.archivos = [];
  }
}
