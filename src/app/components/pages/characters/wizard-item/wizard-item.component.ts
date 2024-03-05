import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-wizard-item',
  templateUrl: './wizard-item.component.html',
  styleUrls: ['./wizard-item.component.scss']
})
export class WizardItemComponent {
  
  @Input() userWizard!: {
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
  }
}
