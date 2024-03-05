import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import gsap from 'gsap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  listHouses: { picture: string }[] = [];
  listBooks: { picture: string }[] = [];
  listCharacters: { picture: string }[] = [];
  listUserWizards: any[] = [];
  listBloods: any[] = [];
  currentIndex: number = 0;
  currentTransition: boolean = false;
  images: string[] = [
    "../../../../assets/bg-intro/bg-img.jpg",
    "../../../../assets/bg-intro/bg-img-2.jpg",
    "../../../../assets/bg-intro/bg-img-3.jpg",
    "../../../../assets/bg-intro/bg-img-4.jpg",
    "../../../../assets/bg-intro/bg-img-5.jpg",
    "../../../../assets/bg-intro/bg-img-6.jpg",
    "../../../../assets/bg-intro/bg-img-7.jpg",
    "../../../../assets/bg-intro/bg-img-8.jpg",
    "../../../../assets/bg-intro/bg-img-9.jpg",
    "../../../../assets/bg-intro/bg-img-10.jpg",
    "../../../../assets/bg-intro/bg-img-11.jpg",
    "../../../../assets/bg-intro/bg-img-12.jpg",
    "../../../../assets/bg-intro/bg-img-13.jpg",
    "../../../../assets/bg-intro/bg-img-14.jpg",
    "../../../../assets/bg-intro/bg-img-15.jpg",
    "../../../../assets/bg-intro/bg-img-16.jpg",
    "../../../../assets/bg-intro/bg-img-17.jpg",
    "../../../../assets/bg-intro/bg-img-18.jpg",
    "../../../../assets/bg-intro/bg-img-19.jpg",
    "../../../../assets/bg-intro/bg-img-20.jpg",
    "../../../../assets/bg-intro/bg-img-21.jpg",
    "../../../../assets/bg-intro/bg-img-22.jpg",
    "../../../../assets/bg-intro/bg-img-23.jpg",
    "../../../../assets/bg-intro/bg-img-24.jpg",
    "../../../../assets/bg-intro/bg-img-25.jpg"
  ];
  
  constructor(
    private requestService: RequestService,
    private elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    // Obtener datos de localStorage usando el servicio RequestService
    this.listBooks = this.requestService.getDataFromLocalStorage('books');
    this.listHouses = this.requestService.getDataFromLocalStorage('houses');
    this.listCharacters = this.requestService.getDataFromLocalStorage('characters');
    this.listUserWizards = this.requestService.getDataFromLocalStorage('users_wizards');
    this.listBloods = this.requestService.getDataFromLocalStorage('bloods');
    
    // Si los personajes no están en el localStorage, obtenerlos y luego aleatorizarlos
    if (!this.listCharacters) {
      this.requestService.getCharacters().then(
        (characters) => {
          //console.log('Personajes:', characters);
          this.listCharacters = characters;
          this.requestService.setDataInLocalStorage('characters', characters);
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.log('Éxito al cargar desde el localStorage');
    }

    if (!this.listBloods) {
      this.requestService.getBloods().then(
        (blood) => {
          this.listBloods = blood;
          this.requestService.setDataInLocalStorage('bloods', blood);
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.log('Éxito al cargar desde el localStorage');
    }
  
    if (!this.listUserWizards) {
      this.requestService.getUserWizard().then(
        (userWizard) => {
          //console.log('Personajes:', characters);
          this.listUserWizards = userWizard;
          this.requestService.setDataInLocalStorage('users_wizards', userWizard); // Guardar en localStorage
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.log('Éxito al cargar desde el localStorage');
    }

    if (!this.listBooks) {
      this.requestService.getBooks().then(
        (books) => {
          //console.log('Libros:', books);
          this.listBooks = books;
          this.requestService.setDataInLocalStorage('books', books);
        },
        (error) => {
          console.error(error)
        }
      );
    } else {

      console.log('Éxito al cargar desde el localStorage');
    }

    if (!this.listHouses) {
      this.requestService.getHouses().then(
        (houses) => {
          //console.log('Casas:', houses);
          this.listHouses = houses;
          this.requestService.setDataInLocalStorage('houses', houses);
        }, 
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.log('Éxito al cargar desde el localStorage');
    }
  }

  animateImages(): void {
    const arrayBgIntro = this.elementRef.nativeElement.querySelectorAll('.animate-bg');
    const tl = gsap.timeline({});
    const screenWidth = window.innerWidth;
    const delay = screenWidth <= 1024 ? 0 : 2.2;
    
    gsap.from('.title-item', {
      x: -1000,
      duration: 1,
      stagger: 0.4,
      ease: 'power3.out',
      delay: delay
    });

    arrayBgIntro.forEach((element: any) => {
      tl.from(element, {
        scale: 0,
        duration: 0.1,
        ease: "power1.inOut"
      });
      tl.to({}, { duration: 0.2 }, "-=0.2");
    });

  }

  ngAfterViewInit(): void {
    this.animateImages();
    this.showCurrentImage();
  }

  slideLeft() {
    this.currentIndex = (this.currentIndex === 0) ? this.images.length - 1 : this.currentIndex - 1;
    this.showCurrentImage()
  }

  slideRight() {
    this.currentIndex = (this.currentIndex === this.images.length - 1) ? 0 : this.currentIndex + 1;
    this.showCurrentImage()
  }

  showCurrentImage() {
    const currentImage = this.elementRef.nativeElement.querySelector('.img-gallery');
    currentImage.classList.add('show');

    setTimeout(() => {
      currentImage.classList.remove('show');
      setTimeout(() => {
        currentImage.classList.add('show');
      }, 200); // Pequeño retardo para permitir la eliminación de la clase
    }, 0);
  }
}

