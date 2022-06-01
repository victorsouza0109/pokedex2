import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PokemonsService } from '../services/pokemons.service';

@Component({
  selector: 'app-page-poke',
  templateUrl: './page-poke.component.html',
  styleUrls: ['./page-poke.component.scss']
})
export class PagePokeComponent implements OnInit {
  poke = {
    name: '',
    id: '',
    types: [
      {
        type: {
          name: ''
        }
      }
    ],
    height: '',
    weight: ''
  };
  constructor(
    private route: ActivatedRoute, private PokemonsService: PokemonsService
  ) { }

  async ngOnInit() {
    await this.loadData();
    this.formatHeight(this.poke.height)
    this.formatWeight(this.poke.weight)
  }
  async loadData() {
    let id = this.route.snapshot.params['id'];
    this.poke = await this.PokemonsService.getPokeByID(id);
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
  async nextPoke(id: any) {
    id = id + 1
    this.poke = await this.PokemonsService.getPokeByID(id)
    this.formatHeight(this.poke.height)
    this.formatWeight(this.poke.weight)
  }

  async previousPoke(id: any) {
    id = id - 1
    if (id >= 1) {
      this.poke = await this.PokemonsService.getPokeByID(id)
      this.formatHeight(this.poke.height)
      this.formatWeight(this.poke.weight)
    }
  }
  formatHeight(height: any) {
    let heightString = height.toString();
    if (height < 10) {
      heightString = '0.' + heightString
      this.poke.height = heightString
    } else {
      let heightString1 = heightString.substring(0, 1)
      let heightString2 = heightString.substring(1)
      heightString = heightString1 + '.' + heightString2
      this.poke.height = heightString
    }
  }
  formatWeight(weight: any) {
    let weightString = weight.toString();
    if (weight < 100) {
      weightString = '0.' + weightString
      this.poke.weight = weightString
    } else if (weight < 1000) {
      let weightString1 = weightString.substring(0, 2)
      let weightString2 = weightString.substring(2)
      weightString = weightString1 + '.' + weightString2
      this.poke.weight = weightString
    } else {
      let weightString1 = weightString.substring(0, 3)
      let weightString2 = weightString.substring(3)
      weightString = weightString1 + '.' + weightString2
      this.poke.weight = weightString
    }
  }
}
