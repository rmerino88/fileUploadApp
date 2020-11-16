import { Directive, EventEmitter, ElementRef, HostListener, Input, Output } from '@angular/core';
import { FileItem } from '../models/file-item/file-item';
/**
 * EventEmitter --> 
 * ElementRef --> 
 * HostListener --> 
 * Input --> 
 * Output --> 
 */

@Directive({
  selector: '[appNgDropFiles]'
})
export class NgDropFilesDirective {

  @Output() mouseSobre: EventEmitter<boolean> = new EventEmitter();
  @Input() archivos: FileItem[] = [];

  constructor() { }

  @HostListener('dragover', ['$event'])
  public onDragOver( event: any ) {
    this.mouseSobre.emit( true );
    this._prevenirDetener( event );
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave( event: any ) {
    this.mouseSobre.emit( false );
  }

  @HostListener('drop', ['$event'])
  public onDrop( event: any) {
    // Obtenemos la información del elemento que se ha dropeado
    const transferencia = this._getTransferencia(event);
    if ( !transferencia ) {
      return;
    }
    console.log('Transferencia: ' + transferencia);
    this._extraerArchivos(transferencia.files);

    this._prevenirDetener( event );
    this.mouseSobre.emit( false );
  }

  private _getTransferencia( event: any ) {
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  private _extraerArchivos( archivosLista: File[] ) {
    // Se crea una iteración para recorrer cada una de las propiedades del objeto
    console.log('Longitud archivos: ' + archivosLista.length);

    // for ( const propiedad of Object.getOwnPropertyNames( archivosLista ) ) {
    //   console.log('Propiedad: ' + propiedad);
    //   const archivoTemporal = archivosLista[propiedad];
    //   if ( this._archivoPuedeSerCargado(archivoTemporal) ) {
    //     const nuevoArchivo = new FileItem ( archivoTemporal );
    //     this.archivos.push( nuevoArchivo );
    //   }
    // }

    for ( const archivoTemporal of archivosLista ) {
      console.log('Nuevo archivo: ' + archivoTemporal);
      if ( this._archivoPuedeSerCargado(archivoTemporal) ) {
        const nuevoArchivo = new FileItem ( archivoTemporal );
        this.archivos.push( nuevoArchivo );
      }
    }

    console.log('Archivos: ' + this.archivos);
  }

  // Validaciones
  private _archivoPuedeSerCargado( archivo: File ): boolean {
    if ( !this._archivoYaDroppeado(archivo.name) || this._esImagen(archivo.type) ) {
      return true;
    }
    return false;
  }

  private _prevenirDetener( event ) {
    event.preventDefault();
    event.stopPropagation();
  }

  private _archivoYaDroppeado( nombreArchivo: string ): boolean {
    for ( const archivo of this.archivos ) {
      if ( archivo.nombreArchivo === nombreArchivo ) {
        console.log(`El archivo ${nombreArchivo} ya se encuentra en la lista.`);
        return true;
      }
    }
    return false;
  }

  private _esImagen( tipoArchivo: string ): boolean {
    return ( tipoArchivo === '' || tipoArchivo === undefined ? false : tipoArchivo.startsWith('image'));
  }

}
