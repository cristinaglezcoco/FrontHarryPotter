import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { ActivatedRoute } from '@angular/router';
import gsap from 'gsap';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.scss']
})
export class CharacterDetailComponent implements OnInit {
  detailCharacter: any = {};
  id: string = '';
  horrocruxImages: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private requestService: RequestService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.detailCharacter = this.requestService.getDataFromLocalStorage(`character_${this.id}`);

    if (!this.detailCharacter) {
      this.requestService.getCharactersById(this.id).then(
        (character) => {
          console.log('Personaje:', character);
          this.detailCharacter = character;
          this.requestService.setDataInLocalStorage(`character_${this.id}`, character); // Guardar en localStorage

          // Llamar a la función para obtener las URLs de los horrocruxes al cargar el personaje
          this.updateHorrocruxImages();
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.log('Éxito al cargar desde el localStorage');
      // Llamar a la función para obtener las URLs de los horrocruxes si el personaje ya está en el almacenamiento local
      this.updateHorrocruxImages();
    }
  }

  // Método para obtener las URLs de los horrocruxes
  private updateHorrocruxImages(): void {
    if (this.detailCharacter.horrocruxes) {
      this.horrocruxImages = this.detailCharacter.horrocruxes.map((horrocrux: string) => {
        return this.getHorrocruxImageUrl(horrocrux);
      });
    }
  }

  // Método para obtener la URL de un horrocrux específico
  private getHorrocruxImageUrl(partialName: string): string {
    const word = partialName.toLowerCase().split(' ');
    partialName = word[0];
    return `../../../../../../assets/horrocruxes/${partialName}.png`;
  }
}
