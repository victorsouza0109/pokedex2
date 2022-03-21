import { Component, OnInit } from '@angular/core';
import { PokemonsService } from '../services/pokemons.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {
  pokes:any = [];
  constructor(private PokemonsService: PokemonsService) { }

  async ngOnInit() {
    await this.listarPokes();
  }
  async listarPokes(){
    let response = await this.PokemonsService.listarPokemons();
    this.pokes = response.results;
    for(let poke of this.pokes){
      poke.details = await this.PokemonsService.getPokemon(poke.url);
    }
    console.log(this.pokes);
  }
}