import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  ulVisibility: boolean = false;
  ifToken: boolean = false;

  constructor(
    private elementRef: ElementRef,
    private hideLogin: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if(sessionStorage.getItem('token')) {
      this.ifToken = true;
    }
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.ulVisibility = false; // Cierra el menú responsivo si se hace clic fuera de él
    }
  }

  handleUlVisibility() {
    this.ulVisibility = !this.ulVisibility;
  }

  logOut() {
    sessionStorage.clear()
    this.hideLogin.hideLogin.emit(false)
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
