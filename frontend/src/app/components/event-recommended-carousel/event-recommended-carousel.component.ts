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
  slideIndex: number = 0;
  slideInit: boolean = false;

  constructor(
    private api: ApiService,
    private eRef: ElementRef,
    private library: FaIconLibrary
  ) {
    library.addIcons(faChevronLeft, faChevronRight);
  }

  ngOnInit(): void {
    this.api.getRecommendedEvents().subscribe((next) => {
      this.events = next;
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
      slides[i].classList.add('hidden');
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].classList.remove('active');
    }

    slides[this.slideIndex].classList.remove('hidden');
    dots[this.slideIndex].classList.add('active');
  }
}
