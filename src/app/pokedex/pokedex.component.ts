import { Component, OnInit } from '@angular/core';
import { PokemonsService } from '../services/pokemons.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {
  pokes:any = [];
  filteredPokes: any[] = [];
  filterPokes='';
  url:any = [];
  constructor(private PokemonsService: PokemonsService) { }

  async ngOnInit() {
    await this.listarPokes();
    this.filteredPokes = [...this.pokes];
    console.log(this.filteredPokes)
  }
  async listarPokes(){
    let response = await this.PokemonsService.listarPokemons();
    this.pokes = response.results;
    for(let poke of this.pokes){
      poke.details = await this.PokemonsService.getPokemon(poke.url);
      /* poke.urlImg = this.getImgUrl(poke.details.id)*/
    }
  }
  getImgUrl(id:any){
    if(id < 10){
      id = '00'+id
    }else if(id < 100){
      id = '0'+id
    }else if(id >= 100){
      id = ('000' + id).slice(-3);
    }
    return `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${id}.png`
  }
  filter() {
    if (!this.filterPokes) {
      this.filteredPokes = [...this.pokes];
    }else {
      this.filteredPokes = this.pokes.filter((data: any) => {
       return data.name.toLowerCase().includes(this.filterPokes.toLowerCase())
    })
    }
  }
}