import { Component, OnInit, HostListener, AfterViewInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import gsap from 'gsap';

@Component({
  selector: 'app-house-list',
  templateUrl: './house-list.component.html',
  styleUrls: ['./house-list.component.scss']
})
export class HouseListComponent implements OnInit {
  listHouses: {
    fundador: string, 
    nombre: string,
    picture: string,
    reliquia: string
  }[] = []

  constructor(
    private requestService: RequestService
  ) {}

  ngOnInit(): void {
    this.listHouses = this.requestService.getDataFromLocalStorage('houses');
    console.log(this.listHouses);
  }

  

}
