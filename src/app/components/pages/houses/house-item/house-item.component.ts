import { Component, Input, OnInit, AfterViewInit, ElementRef, QueryList, ViewChildren } from '@angular/core';
import gsap from 'gsap';

@Component({
  selector: 'app-house-item',
  templateUrl: './house-item.component.html',
  styleUrls: ['./house-item.component.scss']
})
export class HouseItemComponent implements AfterViewInit {
  @Input() house!: {
    fundador: string, 
    nombre: string,
    picture: string,
    reliquia: string
  }

  @ViewChildren('animatedItem') animatedItems!: QueryList<ElementRef>;
  @ViewChildren('animatedItemTwo') animatedItemsTwo!: QueryList<ElementRef>;

  ngAfterViewInit(): void {
    this.animateFoundersImg();
    this.animateFoundersText();
  }

  animateFoundersImg(): void {
    this.animatedItems.forEach((element: ElementRef, index: number) => {
      gsap.from(element.nativeElement, {
        scale: 0,
        opacity: 0,
        duration: 1,
        stagger: 0.5,
        delay: index * 3,
        borderRadius: 15
      });
    });
  }

  animateFoundersText(): void {
    this.animatedItemsTwo.forEach((element: ElementRef, index: number) => {
      gsap.from(element.nativeElement, {
        y: 200,
        scale: 0,
        opacity: 0,
        duration: 1,
        stagger: 0.5,
        delay: index + 1
      });
    });
  }
}
