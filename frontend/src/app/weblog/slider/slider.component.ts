import { Component, Input, OnInit } from '@angular/core';

import { ISlide } from 'src/app/dashboard/slider/slider.model';
import Carousel from 'src/app/shared/utils/carousel';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'home-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class HomeSliderComponent implements OnInit {
  BACKEND_API_URL = environment.BACKEND_API_URL;

  @Input() slides: ISlide[] = []
  carousel!: Carousel;

  constructor(
  ) {}

  ngOnInit(): void {
    console.log('ngOnInit: ', this.slides)
    setTimeout(() => {
      this.carouselInit();
    }, 1000)
  }

  carouselInit(): void {

    const positions = Array(this.slides.length).fill(0).map((_, i) => i+1);
    const items = positions.map(i => ({
        position: i-1,
        el: document.getElementById(`carousel-item-${i}`)
    }))
    const indicatorItems = positions.map(i => ({
        position: i-1,
        el: document.getElementById(`carousel-indicator-${i}`)
    }))

    const options = {
      activeItemPosition: 1,
      interval: 9000,
      
      indicators: {
          activeClasses: 'bg-white dark:bg-gray-800',
          inactiveClasses: 'bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800',
          items: indicatorItems
      },
    };

    this.carousel = new Carousel(items, options);
    this.carousel.cycle()

    // optional
    const prevButton = document.getElementById('data-carousel-prev');
    const nextButton = document.getElementById('data-carousel-next');
    prevButton?.addEventListener('click', () => this.carousel.prev());
    nextButton?.addEventListener('click', () => this.carousel.next());

    
  }


}
