// character-list.component.ts
import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import gsap from 'gsap';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit, AfterViewInit {
  constructor(
    private requestService: RequestService,
    private elementRef: ElementRef
  ) {}

  listCharacters: {
    agrupacion: string,
    casaNombre: string,
    horrocruxes: string[],
    nombre: string,
    patronus: string,
    picture: string,
    rol: string,
    sangre: {tipo: string, descripcion: string}[],
    sangreTipo: string,
    _id: string 
  }[] = [];

  listUserWizards: {
    agrupacion: string,
    casaNombre: string,
    horrocruxes: string[],
    nombre: string,
    apellido: string,
    patronus: string,
    picture: string,
    rol: string,
    sangreTipo: string,
    _id: string 
  }[] = [];

  ngOnInit(): void {
    this.listCharacters = this.requestService.getDataFromLocalStorage('characters');
    this.listUserWizards = this.requestService.getDataFromLocalStorage('users_wizards');
  }

  handleSearchName(searchTerm: string) {
    this.listCharacters = this.requestService.getDataFromLocalStorage('characters');
    this.listUserWizards = this.requestService.getDataFromLocalStorage('users_wizards');
    
    this.listCharacters = this.listCharacters.filter(character =>
      character.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    this.listUserWizards = this.listUserWizards.filter(wizard =>
      wizard.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  
  resetCharacters() {
    this.listCharacters = this.requestService.getDataFromLocalStorage('characters');
    this.listUserWizards = this.requestService.getDataFromLocalStorage('users_wizards');
  }

  handleFormFilters(formData: FormData) {
    const house = formData.get('house') as string;
    const blood = formData.get('blood') as string;
    const group = formData.get('group') as string;
  
    this.listCharacters = this.requestService.getDataFromLocalStorage('characters');
    this.listUserWizards = this.requestService.getDataFromLocalStorage('users_wizards');
  
    // Verifica que house, blood y group sean diferentes de undefined antes de acceder a sus propiedades
    this.listCharacters = this.listCharacters.filter(character => 
      (group ? character.agrupacion.includes(group) : true) &&
      (house ? character.casaNombre === house : true) &&
      (blood ? character.sangreTipo === blood : true)
    );
  
    this.listUserWizards = this.listUserWizards.filter(wizard =>
      (group ? wizard.agrupacion.includes(group) : true) &&
      (house ? wizard.casaNombre === house : true) &&
      (blood ? wizard.sangreTipo === blood : true)
    );
  }

  animateArticles() {
    const array = this.elementRef.nativeElement.querySelectorAll('.animated-char');
    const timeline = gsap.timeline({});

    array.forEach((element: any, index: number) => {
      timeline.from(element, {
        opacity: 0,
        y: 100,
        duration: 0.3, // Aumenta la duración para una transición más suave
        ease: "power3.inOut", // Utiliza una función de ease más suave, como "elastic"
        stagger: 0.3 // Agrega un pequeño retraso entre elementos para una animación más secuencial
      });
    });
    
  }

  ngAfterViewInit(): void {
    this.animateArticles()
  }
}
