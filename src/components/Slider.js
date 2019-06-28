import Slide from './Slide.js'
import imagesLoaded from 'imagesloaded'

export default class Slider {
  constructor () {
    this.slides = []
    this.controls = document.getElementsByClassName('slide__control')
    this.nextBtn = document.getElementById('nextBtn')
    this.prevBtn = document.getElementById('prevBtn')
    this.loading = document.getElementById("loading")

    this.current = 0

    this.mainContainer = document.getElementById("sectionContainer")

    this.initSlides()

    this.direction = true
    this.inAnimation = false

    imagesLoaded( this.mainContainer, (instance) => {

      this.loading.style.display = "none";

      this.revealSlide()

      this.bindControlsEvent()
      this.bindKeyEvent()
      //this.bindMouseEvent()
      this.bindTouchEvent()
    })

  }

  bindKeyEvent () {
    document.addEventListener("keyup", (event) => {
      if( event && ( event.keyCode == 39 || event.keyCode == 40 ) ) {
        this.direction = true
        this.changeSlide() 
      }
      if( event && ( event.keyCode == 38 || event.keyCode == 37 ) ) {
        this.direction = false
        this.changeSlide()
      } 
    })
  }

  bindMouseEvent () {
    document.addEventListener("mousewheel", (event) => {
      this.direction = event.wheelDelta < 0
      this.changeSlide()
    })
    document.addEventListener("DOMMouseScroll", (event) => {
      this.direction = event.detail == 3  
      this.changeSlide()
    })
  }

  bindTouchEvent () {
    this.touchtimes = 0
    this.touchx = []
    document.addEventListener("touchstart", (event) => {
      this.touchtimes ++ ;
      this.touchx[this.touchtimes] = event.changedTouches[0].clientY;  
    })

    document.addEventListener("touchend", (event) => {
      this.touchtimes ++ ;
      this.touchx[this.touchtimes] = event.changedTouches[0].clientY;

      if( ( Math.abs(this.touchx[this.touchtimes] - this.touchx[this.touchtimes-1]) > 50 )) {
        this.direction = this.touchx[this.touchtimes] > this.touchx[this.touchtimes - 1];
        this.changeSlide();
      }
    
    })
  }

  bindControlsEvent () {
    this.nextBtn.addEventListener("click", () => this.nextSlide())
    this.prevBtn.addEventListener("click", () => this.prevSlide())
  }

  initSlides () {
    let i = 0,
        sections = document.getElementsByClassName("slide__section");
    for ( let section of sections ) {
      let slide = new Slide(section, this)
      this.slides.push(slide)

      let control = this.controls[i]
      slide.control = control
      control.slideIndex = i

      this.bindEventToControl(control)

      i++
    }
    this.controls[this.current].classList.add("current")
    this.len = this.slides.length
  }

  bindEventToControl (control) {
    let self = this;
    control.addEventListener("click", function() {
      self.direction = this.slideIndex;
      self.changeSlide();
    });
  }

  move (index) {
    if( this.direction === true ) {
      this.current ++
      if( this.current > this.len - 1 ) {
        this.current = 0
      }
    } else if ( this.direction === false ) {
      this.current -- 
      if( this.current < 0 ) {
        this.current = this.len - 1
      }
    } else if ( typeof(this.direction) ) {
      this.current = this.direction
    }

    this.revealSlide()
  }

  revealSlide () {
    this.slides[this.current].reveal()
  }

  changeSlide () {
    if( this.inAnimation ) {
      return
    }
    this.slides[this.current].reverse()
  }

  prevSlide () {
    this.direction = false
    this.changeSlide()
  }

  nextSlide () {
    this.direction = true
    this.changeSlide()
  }
}
