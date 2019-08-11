import { TweenMax, TimelineLite, Sine} from 'gsap/TweenMax'

export default class Slide {

  /**
   * @param {element} ele The html element of a slide.
   * @param {Slider} slider The main control of all the slides.
   */
  constructor(ele, slider) {
    this.ele = ele
    this.slider = slider

    this.imgPlaceholder = this.ele.getElementsByClassName("slide__img_placehold")[0]
    this.titleInner = this.ele.getElementsByClassName("slide__title_inner")[0]
    this.titleText = this.ele.getElementsByClassName("slide__title_text")[0]
    this.timeInner = this.ele.getElementsByClassName("slide__time_inner")[0]
    this.timeText = this.ele.getElementsByClassName("slide__time_text")[0]
  }

  /**
   * The animation of hiding the previous slide.
   */
  reverse () {
    this.timeLine.reverse()
  }

  /**
   * The animation of revealing a slide.
   */
  reveal () {
    this.show()

    if( this.timeLine ) {
      this.timeLine.restart()
      return
    } 

    this.timeLine = new TimelineLite();

    let easeType = Sine.easeInOut;

    this.timeLine.add( TweenMax.to( this.imgPlaceholder, 0.45, {
      height: 0,
      transform: 'translateY(-100%)',
      ease: easeType,
    }));
    this.timeLine.add( TweenMax.to( this.titleInner, 0.35, {
      ease: easeType,
      width: '100%',
      opacity: 1
    }), '-=0.4');
    this.timeLine.add( TweenMax.to( this.titleText, 0.35, {
      ease: easeType,
      transform: 'translateX(0)',
      opacity: 1
    }), '-=0.3');
    this.timeLine.add( TweenMax.to( this.timeInner, 0.35, {
      ease: easeType,
      width: '100%',
      opacity: 1
    }), '-=0.2')
    this.timeLine.add( TweenMax.to( this.timeText, 0.35, {
      ease: easeType,
      transform: 'translateX(0)',
      opacity: 1
    }), '-=0.15');

    let self = this

    this.timeLine.eventCallback('onReverseComplete', () => {
      self.hide()
      self.slider.move()
    });
    
    this.timeLine.eventCallback('onStart', function() {
      self.slider.inAnimation = true
    });
    
    this.timeLine.eventCallback('onComplete', function() {
      self.slider.inAnimation = false
    })
  }

  /**
   * Hide the current element and control.
   * */
  hide () {
    this.control.classList.remove("current")
    this.ele.style.opacity = '0'
    this.ele.style.zIndex = '1'
  }

  /**
   * Show the current element and control.
   * */
  show () {
    this.ele.style.opacity = '1'
    this.ele.style.zIndex = '5'
    this.control.classList.add("current") 
  }
}
