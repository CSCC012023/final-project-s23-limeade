import { Component, ElementRef } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { LimeEvent } from 'src/app/classes/limeEvent';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-event-recommended-carousel',
  templateUrl: './event-recommended-carousel.component.html',
  styleUrls: ['./event-recommended-carousel.component.css'],
})
export class EventRecommendedCarouselComponent {
  events!: LimeEvent[];
  slideHidden: boolean[] = [];
  slideIndex: number = 0;
  slideInit: boolean = false;
  dotActive: boolean[] = [];

  constructor(
    private api: ApiService,
    private eRef: ElementRef,
    private library: FaIconLibrary,
  ) {
    library.addIcons(faChevronLeft, faChevronRight);
  }

  ngOnInit(): void {
    this.api.getRecommendedEvents().subscribe((next) => {
      this.events = next;
      this.events.forEach((event) => {
        this.slideHidden.push(true);
        this.dotActive.push(false);
      });
    });
  }

  ngAfterViewChecked(): void {
    if (!this.slideInit) {
      this.showSlide(this.slideIndex);
      this.slideInit = true;
    }
  }

  changeSlide(n: number) {
    this.showSlide((this.slideIndex += n));
  }

  showSlide(n: number) {
    this.slideIndex = n;
    let slides = this.eRef.nativeElement.getElementsByClassName('slide');
    let dots = this.eRef.nativeElement.getElementsByClassName('dot');
    if (n >= slides.length) {
      this.slideIndex = 0;
    }
    if (n < 0) {
      this.slideIndex = slides.length - 1;
    }
    let i;
    for (i = 0; i < slides.length; i++) {
      this.slideHidden[i] = true;
    }
    for (i = 0; i < dots.length; i++) {
      this.dotActive[i] = false;
    }

    this.slideHidden[this.slideIndex] = false;
    this.dotActive[this.slideIndex] = true;
  }
}
