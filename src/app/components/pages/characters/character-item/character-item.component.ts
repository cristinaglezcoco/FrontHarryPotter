import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-character-item',
  templateUrl: './character-item.component.html',
  styleUrls: ['./character-item.component.scss']
})
export class CharacterItemComponent implements OnInit {
  @Input() character!: {
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
  }
  
  @Input() index!: number

  ngOnInit(): void {
    
  }
}
