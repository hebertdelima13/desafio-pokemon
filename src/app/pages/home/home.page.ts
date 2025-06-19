import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonSearchbar, IonHeader, IonContent, IonCol, IonGrid, IonRow, IonButton } from '@ionic/angular/standalone';
import { PokemonCardComponent } from 'src/app/components/pokemon-card/pokemon-card.component';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonSearchbar, IonHeader, IonContent, IonCol, IonGrid, IonRow, IonButton, PokemonCardComponent],
})
export class HomePage {
  pokemonService = inject(PokemonService);
  router = inject(Router);

  goToDetails(pokemon: any) {
      this.pokemonService.selectPokemon(pokemon);
    this.router.navigate(['/details', pokemon.name]);
  }

  nextPage() {
    this.pokemonService.nextPage();
  }

  previousPage() {
    this.pokemonService.previousPage();
  }
}
