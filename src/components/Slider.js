import Slide from './Slide.js'
import imagesLoaded from 'imagesloaded'

export default class Slider {
  constructor () {
    this.slides = []
    this.controls = document.getElementsByClassName('slide__control')
    this.loading = document.getElementById("loading")

    /**
     * Stop if there is no slides.
     */
    if ( this.controls.length < 1 ) {
      this.removeLoading();
      return;
    }

    this.nextBtn = document.getElementById('nextBtn')
    this.prevBtn = document.getElementById('prevBtn')

    this.current = 0

    this.mainContainer = document.getElementById("sectionContainer")

    this.initSlides()

    this.direction = true
    this.inAnimation = false

    imagesLoaded( this.mainContainer, (instance) => {

      this.removeLoading()

      this.revealSlide()

      this.bindControlsEvent()
      this.bindKeyEvent()
      this.bindMouseEvent()
      this.bindTouchEvent()
    })
  }

  /**
   * Remove the loading animation.
   */
  removeLoading () {
    this.loading.style.display = "none";
  }

  /**
   * Init slides, controls and bind event to them.
   */
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

  /**
   * Bind top/right/bottom/left key event to animation.
   */
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

  /**
   * Bind mousewheel event to show animation.
   */
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

  /**
   * Bind touch event on mobile to show animation.
   */
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

  /**
   * Bind click events to the prev and next btn.
   */
  bindControlsEvent () {
    this.nextBtn.addEventListener("click", () => this.nextSlide())
    this.prevBtn.addEventListener("click", () => this.prevSlide())
  }

  /**
   * Bind click events to a control.
   * @param {element} control The html element of a control.
   */
  bindEventToControl (control) {
    let self = this;
    control.addEventListener("click", function() {
      self.direction = this.slideIndex;
      self.changeSlide();
    });
  }

  /**
   * Move to the slide with a given index;
   * @param {number} index The index of slide to be shown.
   */
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
    } else {
      this.current = this.direction
    }

    this.revealSlide()
  }

  /**
   * Reveal the current slide.
   */
  revealSlide () {
    this.slides[this.current].reveal()
  }

  /**
   * Move to the previous slide.
   */
  prevSlide () {
    this.direction = false
    this.changeSlide()
  }

  /**
   * Move to next slide.
   */
  nextSlide () {
    this.direction = true
    this.changeSlide()
  }

  /**
   * Move the slide.
   */
  changeSlide () {
    if( this.inAnimation ) {
      return
    }
    this.slides[this.current].reverse()
  }
}
