import { heart } from 'ionicons/icons';
import { Component, signal, input, inject, computed } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import {
  IonCard,
  IonButton,
  IonIcon,
  IonCardHeader,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
  imports: [IonCard, IonButton, IonIcon, IonCardHeader],
})
export class PokemonCardComponent {
  pokemon = input<any>();
  pokemonService = inject(PokemonService);

  pokemonId = computed(() => this.pokemon()?.id ?? 0);
  imgUrl = computed(() => this.pokemon()?.sprites?.front_default ?? '');

  constructor() {
    addIcons({ heart });
  }

  toggleFavorite(id: number) {
    this.pokemonService.toggleFavorite(id);
  }
}
