import { Component, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonSlides, NavController } from '@ionic/angular';
import { BuscarService } from '../servicios/buscar.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  @ViewChild('hola') slider: IonSlides;

  obj:any;
  pelicula:any;
  generos:any=[];
  resultados:any=[];
  peliculas:any[];
  segment = 0;

  constructor(private servBusqueda: BuscarService, private nav:NavController,private storage: Storage) { 
    servBusqueda.obtenerTodosGeneros().subscribe(
      data=>{
        this.obj = data;
        this.generos = this.obj.genres;
        this.consultar();
      }, err=>{
        console.log(err);
      });
  }

  consultar(){
    let onj:any;
    this.generos.forEach(element => {
      let genero= {nombre:'',listaP:[]};
      genero.nombre = element.name;
      this.servBusqueda.buscarPorGeneros(element.id).subscribe(
        data=>{
          onj = data;
          genero.listaP = onj.results;
          this.resultados.push(genero);
        }, err=>{
          console.log(err);
      });
    });
  }

  abrirPop(pelicul){
    this.storage.set('pelicula',JSON.stringify(pelicul)).then((val)=>{
      this.nav.navigateRoot('/detalle');
    });
  }

  sliderOption ={
    slidesPerView:2.4,
    speed: 400
  }

  async segmentChanged(event) {
    await this.slider.slideTo(this.segment);    
  }

  async slideChanged() {
    this.segment = await this.slider.getActiveIndex();
  }

}
