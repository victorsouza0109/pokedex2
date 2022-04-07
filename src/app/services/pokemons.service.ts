import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class PokemonsService {

  constructor(private http: HttpClient) { }

  async listarPokemons(){
    return await this.http.get<any>(`https://pokeapi.co/api/v2/pokemon?limit=8&offset=0`).toPromise();
  }
  async getPokemon(url: any){
    return await this.http.get<any>(url).toPromise();
  }
}
