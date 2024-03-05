import { Component, OnInit, HostListener, ElementRef, AfterViewInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import { ActivatedRoute } from '@angular/router';
import gsap from 'gsap';

@Component({
  selector: 'app-wizard-detail',
  templateUrl: './wizard-detail.component.html',
  styleUrls: ['./wizard-detail.component.scss']
})
export class WizardDetailComponent {
  detailWizard: any = {};
  id: string = '';

  constructor(
    private route: ActivatedRoute,
    private requestService: RequestService,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.detailWizard = this.requestService.getDataFromLocalStorage(`character_${this.id}`);

    if (!this.detailWizard) {
      this.requestService.getUserWizardById(this.id).then(
        (userWizard) => {
          console.log('userWizard:', userWizard);
          this.detailWizard = userWizard;
          this.requestService.setDataInLocalStorage(`user-wizard_${this.id}`, userWizard); // Guardar en localStorage
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.log('Éxito al cargar desde el localStorage');
    }
  }
}
