import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, NavController } from '@ionic/angular'
import { Storage } from '@ionic/storage';
import { BuscarService } from '../servicios/buscar.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  obj: any;
  resultadoPeliculas: any[] = [];

  constructor(private servBusqueda: BuscarService, private nav:NavController,private storage: Storage) {
  }

  ngOnInit() {

  }

  buscar(event) {
    if (event.target.value !== '') {
      this.buscarQuery(event.target.value);
    } else {
      this.resultadoPeliculas = [];
    }
  }

  abrirPop(pelicula){
    this.storage.set('pelicula',JSON.stringify(pelicula)).then((val)=>{
      this.nav.navigateRoot('/detalle');
    });
  }

  buscarQuery(parametroBusqueda) {
    this.servBusqueda.getBusqueda(parametroBusqueda).subscribe(
      data => {
        this.obj = data;
        this.resultadoPeliculas = this.obj.results;
      }, err => {
        console.log(err);
      });
  }
}
