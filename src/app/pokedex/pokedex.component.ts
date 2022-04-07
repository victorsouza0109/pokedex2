import { Component, OnInit } from '@angular/core';
import { PokemonsService } from '../services/pokemons.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnInit {
  pokes: any = [];
  filteredPokes: any[] = [];
  filterPokes = '';
  url: any = [];

  constructor(private PokemonsService: PokemonsService, private spinner: NgxSpinnerService) { }

  async ngOnInit() {
    await this.listarPokes();
    this.filteredPokes = [...this.pokes];
    /* console.log(this.filteredPokes) */
  }

  async listarPokes() {
    let response = await this.PokemonsService.listarPokemons();
    this.pokes = response.results;
    for (let poke of this.pokes) {
      poke.details = await this.PokemonsService.getPokemon(poke.url);
      poke.id = this.getId(poke.details.id)
      poke.name = this.getNameSex(poke.name);
      for (var i = 0; i < poke.details.types.length; i++) {
        poke.details.types[i].type.name = this.toUpperCase(poke.details.types[i].type.name)
      }
    }
  }

  getId(id: any) {
    if (id < 10) {
      id = '00' + id
    } else if (id < 100) {
      id = '0' + id
    } else if (id >= 100) {
      id = ('000' + id).slice(-3);
    }
    return id
  }

  getImgUrl(id: any) {
    if (id < 10) {
      id = '00' + id
    } else if (id < 100) {
      id = '0' + id
    } else if (id >= 100) {
      id = ('000' + id).slice(-3);
    }
    return `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${id}.png`
  }

  getNameSex(name: string) {
    if (name == 'nidoran-f') {
      name = 'nidoran♀';
      return name.charAt(0).toUpperCase() + name.substr(1);
    }
    if (name == 'nidoran-m') {
      name = 'nidoran♂';
      return name.charAt(0).toUpperCase() + name.substr(1);
    }
    return name.charAt(0).toUpperCase() + name.substr(1);
  }

  toUpperCase(type: string) {
    return type.charAt(0).toUpperCase() + type.substr(1);
  }

  filter() {
    if (!this.filterPokes) {
      this.filteredPokes = [...this.pokes];
    } else {
      this.filteredPokes = this.pokes.filter((data: any) => {
        return data.name.toLowerCase().includes(this.filterPokes.toLowerCase())
      })
    }
  }
  async onScroll() {
    if (this.pokes.length < 888) {
      let response = await this.PokemonsService.getPokeByPage(this.pokes.length)
      let pokemon = this.pokes
      this.pokes = response.results
      for (let poke of this.pokes) {
        poke.details = await this.PokemonsService.getPokemon(poke.url);
        poke.id = this.getId(poke.details.id)
        poke.name = this.getNameSex(poke.name);
        for (var i = 0; i < poke.details.types.length; i++) {
          poke.details.types[i].type.name = this.toUpperCase(poke.details.types[i].type.name)
        }
      }
      let pokemonAfter = this.pokes
      pokemon = pokemon.concat(pokemonAfter)
      this.pokes = pokemon
      this.filteredPokes = this.pokes;
      console.log(this.pokes.length )
    }else if(this.pokes.length = 888){
      let response = await this.PokemonsService.getPokeByLastPage(this.pokes.length)
      let pokemon = this.pokes
      this.pokes = response.results
      for (let poke of this.pokes) {
        poke.details = await this.PokemonsService.getPokemon(poke.url);
        poke.id = this.getId(poke.details.id)
        poke.name = this.getNameSex(poke.name);
        for (var i = 0; i < poke.details.types.length; i++) {
          poke.details.types[i].type.name = this.toUpperCase(poke.details.types[i].type.name)
        }
      }
      let pokemonAfter = this.pokes
      pokemon = pokemon.concat(pokemonAfter)
      this.pokes = pokemon
      this.filteredPokes = this.pokes;
      console.log(this.pokes.length )
    }
  }
}