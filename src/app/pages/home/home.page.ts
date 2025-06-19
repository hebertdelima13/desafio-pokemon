import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonSearchbar, IonHeader, IonContent, IonCol, IonGrid, IonRow, IonButton } from '@ionic/angular/standalone';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonSearchbar, IonHeader, IonContent, IonCol, IonGrid, IonRow, IonButton],
})
export class HomePage {
  constructor(public pokemonService: PokemonService, private router: Router) {}

  goToDetails(pokemon: any) {
    this.router.navigate(['/details', pokemon.name]);
  }

  nextPage() {
    this.pokemonService.nextPage();
  }

  previousPage() {
    this.pokemonService.previousPage();
  }
}
