import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';
import { IonToolbar, IonTitle, IonList, IonHeader, IonContent, IonItem, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
    imports: [ IonToolbar, IonTitle, IonList,IonHeader, IonContent, IonItem, IonButton],
})
export class DetailsPage  {

  pokemonService = inject(PokemonService);
  pokemon = this.pokemonService.selectedPokemon;
  router = inject(Router);  
  route = inject(ActivatedRoute);

  constructor(
  ) {
    const name = this.route.snapshot.paramMap.get('name');
    if (name) {
      this.pokemonService.getPokemonDetails(name).subscribe(data => this.pokemon.set(data));
    }
  }

  previousPage() {
    this.router.navigate(['/']);
  }

}
