import Slide from './Slide.js'
import imagesLoaded from 'imagesloaded'
import Component from './Component'

export default class Slider extends Component {
  constructor () {
    super()

    this.inited = false;
  }

  init() {
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
    this.imageLoaded = false;

    // 仅在第一次初始化时绑定事件
    if (!this.inited) {
      this.bindEvents();
    }

    this.bindControlsEvent()


    imagesLoaded( this.mainContainer, (instance) => {
      this.removeLoading()
      this.revealSlide()
      this.imageLoaded = true;
    })

    this.inited = true;
  }

  canBeActive() {
    return !!document.getElementById("sectionContainer");
  }

  onPageLoad() {
    this.init();
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

  bindEvents() {
    this.bindKeyEvent()
    this.bindMouseEvent()
    this.bindTouchEvent()
  }

  bindEvent(eventName, handler) {
    super.bindEvent(document, eventName, (event) => {
      if (!this.imageLoaded) {
        return;
      }

      handler.call(this, event);
    })
  }

  /**
   * Bind top/right/bottom/left key event to animation.
   */
  bindKeyEvent () {
    this.bindEvent("keyup", (event) => {
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
    this.bindEvent("mousewheel", (event) => {
      this.direction = event.wheelDelta < 0
      this.changeSlide()
    })
    this.bindEvent("DOMMouseScroll", (event) => {
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

    this.bindEvent("touchstart", (event) => {
      this.touchtimes ++ ;
      this.touchx[this.touchtimes] = event.changedTouches[0].clientY;  
    })

    this.bindEvent("touchend", (event) => {
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

    this.inAnimation = true;
    this.slides[this.current].reverse()
  }
}
