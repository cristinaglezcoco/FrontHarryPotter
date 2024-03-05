import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-house-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  listBooks: {
    titulo: string, 
    sinopsis: string,
    picture: string,
    anio: number
  }[] = []

  constructor(
    private requestService: RequestService
  ) {}

  ngOnInit(): void {
    this.listBooks = this.requestService.getDataFromLocalStorage('books');
    console.log(this.listBooks);
  }
}
