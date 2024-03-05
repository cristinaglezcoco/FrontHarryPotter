import { Component, OnInit } from '@angular/core';
import { RequestService } from './services/request.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'proyectoAngular';

  constructor(
    private service: RequestService,
    private router: Router
  ) {}

  ngOnInit() {
    
  }
}
