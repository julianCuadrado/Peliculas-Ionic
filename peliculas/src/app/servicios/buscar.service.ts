import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class BuscarService {

  favoritos:any=[];

  constructor(private http:HttpClient) { }

  agregarFavorito(pelicula){
    let pe = this.favoritos.find(function(element){
      return element.id === pelicula.id;
    });
    if(pe == undefined){
      this.favoritos.push(pelicula);
      return "ok";
    }else{
      return "paila";
    }
  }

  obtenerFavoritos(){
    return this.favoritos;
  }

  eliminarFavoritos(idPelicula){

  }

  getBusqueda(busqueda:string){
    return this.http.get('https://api.themoviedb.org/3/search/movie?include_adult=false&page=1&language=en-US&api_key='+environment.key+'&query='+busqueda);
  }

  buscarPorGeneros(idGenero:number){
    return this.http.get('https://api.themoviedb.org/3/discover/movie?language=en-US&api_key='+environment.key+"&with_genres="+idGenero);
  }

  obtenerTodosGeneros(){
    return this.http.get('https://api.themoviedb.org/3/genre/movie/list?api_key=e00b41f37b74198472e51a4ebf8ab601&language=en-US');
  }
}