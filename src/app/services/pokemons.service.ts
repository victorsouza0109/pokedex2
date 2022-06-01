import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PokemonsService {

  constructor(private http: HttpClient) { }

  async listarPokemons(){
    return await this.http.get<any>(`https://pokeapi.co/api/v2/pokemon?limit=16&offset=0`).toPromise();
  }
  async getPokemon(url: any){
    return await this.http.get<any>(url).toPromise();
  }
  async getPokeByPage(id:number){
    return await this.http.get<any>(`https://pokeapi.co/api/v2/pokemon?limit=8&offset=${id}`).toPromise();
  }
  async getPokeByLastPage(id:number){
    return await this.http.get<any>(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${id}`).toPromise();
  }
  async getPokeByID(id:number){
    return await this.http.get<any>(`https://pokeapi.co/api/v2/pokemon/${id}`).toPromise();
  }
}
