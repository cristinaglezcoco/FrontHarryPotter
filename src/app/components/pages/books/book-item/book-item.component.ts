import { Component, Input, OnInit, AfterViewInit, ElementRef, QueryList, ViewChildren } from '@angular/core';
import gsap from 'gsap';


@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.scss']
})
export class BookItemComponent implements OnInit {
  @Input() book!: {
    titulo: string, 
    sinopsis: string,
    picture: string,
    anio: number
  }
  @Input() index!: number

  visibleInfo: boolean = false;

  ngOnInit(): void {
    //console.log(this.index)
  }

  handleVisibilityInfo() {
    this.visibleInfo = !this.visibleInfo;
  }

  @ViewChildren('animatedItem') animatedImgBook!: QueryList<ElementRef>;
  @ViewChildren('animatedItemTwo') animatedTextBook!: QueryList<ElementRef>;

  ngAfterViewInit(): void {
    this.animateBooksImg();
    this.animateBooksText();
  }

  animateBooksImg(): void {
    this.animatedImgBook.forEach((element: ElementRef, index: number) => {
      let animationConfig: any = {
        x: undefined,
        duration: 1.2,
        stagger: 0.5
      };
  
      if (this.index % 2 === 0) {
        console.log(this.index)
        animationConfig.x = -1000;
      } else {
        console.log(this.index)
        animationConfig.x = 1000;
      }
  
      gsap.from(element.nativeElement, animationConfig);
    });
  }
  

  // animateBooksText(): void {
  //   this.animatedTextBook.forEach((element: ElementRef, index: number) => {
  //     gsap.from(element.nativeElement, {
  //       y: 500,
  //       opacity: 0,
  //       duration: 1,
  //       stagger: 0.5,
  //       delay: index + 1
  //     });
  //   });
  // }

 animateBooksText(): void {
   this.animatedTextBook.forEach((element: ElementRef, index: number) => {
     let animationConfig: any = {
       x: undefined,
       duration: 1.2,
       stagger: 0.5,
       delay: index + 1
     };
     if (this.index % 2 === 0) {
       console.log(this.index)
       animationConfig.x = 1000;
     } else {
       console.log(this.index)
       animationConfig.x = -1000;
     }
     gsap.from(element.nativeElement, animationConfig);
   });
 }
}
