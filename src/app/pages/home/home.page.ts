import { Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonSearchbar,
  IonHeader,
  IonContent,
  IonCol,
  IonGrid,
  IonRow,
  IonButton,
} from '@ionic/angular/standalone';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { PokemonCardComponent } from 'src/app/components/pokemon-card/pokemon-card.component';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonSearchbar,
    IonHeader,
    IonContent,
    IonCol,
    IonGrid,
    IonRow,
    IonButton,
    PokemonCardComponent,
    ReactiveFormsModule,
  ],
})
export class HomePage implements OnInit {
  pokemonService = inject(PokemonService);
  router = inject(Router);
  searchControl = new FormControl('');

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((value) => {
        this.pokemonService.searchByName(value!);
      });
  }

  goToDetails(pokemon: any) {
    this.pokemonService.selectPokemon(pokemon);
    this.router.navigate(['/details', pokemon.name]);
  }

  nextPage() {
    this.searchControl.setValue('');
    this.pokemonService.nextPage();
  }

  previousPage() {
    this.searchControl.setValue('');
    this.pokemonService.previousPage();
  }
}
