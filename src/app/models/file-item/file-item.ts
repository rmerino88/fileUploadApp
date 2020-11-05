export class FileItem {
  public archivo: File;
  public nombreArchivo: string;
  public url: string;
  public estaSubiendo: boolean;
  public progreso: number;

  constructor( archivo: File ) {
    this.archivo = archivo;
    this.nombreArchivo = archivo.name;
    this.estaSubiendo = false;
    this.progreso = 0;
  }
  // constructor( nombreArchivo: string, estaSubiendo: boolean, progreso: number ) {
  //   this.nombreArchivo = nombreArchivo;
  //   this.estaSubiendo = false;
  //   this.progreso = 0;
  // }

}

export class FileItemToSave {
  public nombre: string;
  public url: string;

  constructor( nombre: string, url: string ) {
    this.nombre = nombre ;
    this.url = url;
  }

}

export interface FileItemToSaveInterface {
  nombre: string;
  url: string;
}
