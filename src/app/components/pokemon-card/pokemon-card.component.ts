import { heart, heartOutline } from 'ionicons/icons';
import { Component, input, inject, computed } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import {
  IonCard,
  IonButton,
  IonIcon,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonBadge,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
  imports: [
    CommonModule,
    IonCard,
    IonButton,
    IonIcon,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCardContent,
    IonBadge,
  ],
})
export class PokemonCardComponent {
  colorTypeList = [
    {
      type: 'normal',
      color: 'primary',
    },
    {
      type: 'fighting',
      color: 'danger',
    },
    {
      type: 'flying',
      color: 'secondary',
    },
    {
      type: 'poison',
      color: 'tertiary',
    },
    {
      type: 'ground',
      color: 'success',
    },
    {
      type: 'rock',
      color: 'warning',
    },
    {
      type: 'bug',
      color: 'medium',
    },
    {
      type: 'ghost',
      color: 'dark',
    },
    {
      type: 'dark',
      color: 'dark',
    },
    {
      type: 'steel',
      color: 'light',
    },
    {
      type: 'fire',
      color: 'danger',
    },
    {
      type: 'water',
      color: 'primary',
    },
    {
      type: 'grass',
      color: 'success',
    },
    {
      type: 'electric',
      color: 'warning',
    },
    {
      type: 'psychic',
      color: 'tertiary',
    },
    {
      type: 'ice',
      color: 'light',
    },
    {
      type: 'dragon',
      color: 'dark',
    },
    {
      type: 'fairy',
      color: 'dark',
    },
  ];
  pokemon = input<any>();
  pokemonService = inject(PokemonService);

  pokemonId = computed(() => this.pokemon()?.id ?? 0);
  imgUrl = computed(() => this.pokemon()?.sprites?.front_default ?? '');

  constructor() {
    addIcons({ heart, 'heart-outline': heartOutline });
  }

  getColorByType(type: string): string {
    return this.colorTypeList.find((t) => t.type === type)?.color || 'medium';
  }

  toggleFavorite(id: number) {
    console.log(this.pokemon());

    this.pokemonService.toggleFavorite(id);
  }
}
