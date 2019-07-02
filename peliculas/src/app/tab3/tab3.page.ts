import { Component } from '@angular/core';
import { BuscarService } from '../servicios/buscar.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  favoritos:any=[];
  obj:any;
  generos:any=[];
  generosUtilizar:any=[];

  constructor(private ser:BuscarService) {
    ser.obtenerTodosGeneros().subscribe(
      data=>{
        this.obj = data;
        this.generos = this.obj.genres;
      }, err=>{
        console.log(err);
      });
  }

  sliderOption ={
    slidesPerView:3,
    speed: 400
  }

  segmentChanged(event){
    const valorSegmento = event.detail.value;
    
  }

  ionViewWillEnter() {
    this.favoritos= this.ser.obtenerFavoritos(); 
  }
}