import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { BuscarService } from 'src/app/servicios/buscar.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {

  pelicula:any={};

  constructor(public navCtrl:NavController, private st:Storage, private ser:BuscarService, public alertController: AlertController) { 
    
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.st.get('pelicula').then(val=>{
      this.pelicula = JSON.parse(val);
    });
  }

  agregarFavoritos(){
    if(this.ser.agregarFavorito(this.pelicula) === 'ok'){
      this.presentAlert("Agregado a mis favoritos");
    }else{
      this.presentAlert("Ya esta en tu lista");
    }
  }

  async presentAlert(men) {
    const alert = await this.alertController.create({
      header: 'Favoritos',
      message: men,
      buttons: ['OK']
    });
    await alert.present();
  }

  goBack(){
    this.navCtrl.pop();
  }

}
