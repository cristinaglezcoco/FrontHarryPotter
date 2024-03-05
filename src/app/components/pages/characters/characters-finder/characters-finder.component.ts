// characters-finder.component.ts
import { EventEmitter, Output, OnInit, Component } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-characters-finder',
  templateUrl: './characters-finder.component.html',
  styleUrls: ['./characters-finder.component.scss']
})
export class CharactersFinderComponent implements OnInit {
  @Output() searchName = new EventEmitter<string>();
  @Output() formFilter = new EventEmitter<FormData>();
  @Output() resetFilters = new EventEmitter<void>();

  listHouses: {
    fundador: string, 
    nombre: string,
    picture: string,
    reliquia: string
  }[] = [];

  bloods: {
    tipo: string,
  }[] = []

  visibleFilters: boolean = false;

  constructor(private requestService: RequestService) {}

  ngOnInit(): void {
    this.listHouses = this.requestService.getDataFromLocalStorage('houses');
    this.bloods = this.requestService.getDataFromLocalStorage('bloods');
    console.log(this.bloods)
  }

  filterByName(searchName: string) {
    this.searchName.emit(searchName);
    //console.log(searchName)
  }

  sendFormFilter() {
    const house = (document.getElementById('house') as HTMLSelectElement).value;
    const blood = (document.getElementById('blood') as HTMLSelectElement).value;
    const group = (document.getElementById('group') as HTMLSelectElement).value;
  
    const formData = new FormData();
    formData.append('house', house);
    formData.append('blood', blood);
    formData.append('group', group);
  
    this.formFilter.emit(formData);
  }
  

  resetCharacters() {
    this.resetFilters.emit();
    const houseSelect = document.getElementById('house') as HTMLSelectElement;
    houseSelect.selectedIndex = 0;

    const bloodSelect = document.getElementById('blood') as HTMLSelectElement;
    bloodSelect.selectedIndex = 0;

    const groupSelect = document.getElementById('group') as HTMLSelectElement;
    groupSelect.selectedIndex = 0;
  }

  handleVisibleFilters() {
    this.visibleFilters = !this.visibleFilters;
    this.resetFilters.emit();
  }
}
