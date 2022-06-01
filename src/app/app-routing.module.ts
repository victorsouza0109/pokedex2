import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonsService } from './services/pokemons.service';
import { HttpClientModule } from '@angular/common/http';
import { PagePokeComponent } from './page-poke/page-poke.component';
import { PokedexComponent } from './pokedex/pokedex.component';

const routes: Routes = [
  { path: 'pokemons/:id', component: PagePokeComponent },
  { path: '**', component: PokedexComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes),HttpClientModule ],
  exports: [RouterModule, HttpClientModule],
  providers:[PokemonsService]
})
export class AppRoutingModule { }
