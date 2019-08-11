import HoverImg from './HoverImg.js'
import imagesLoaded from 'imagesloaded'

export default class Archive {
  constructor () {
    this.categories = document.getElementsByClassName("category")
    this.posts = document.getElementsByClassName("post__list_item")

    this.init()

    // Bind click event to every category element.
    let _this = this
    for ( let category of this.categories ) {
      category.addEventListener("click", function() {
        if ( this != _this.current ) {
          _this.change(this)
        }
      })
    }

    // Add hover animation to every post.
    for ( let post of this.posts ) {
      new HoverImg( post )

      post.onmouseenter = function(event) {
        _this.fadeAll(event.target)
      }
      post.onmouseleave = function(event) {
        _this.unFadeAll()
      }
    }
  }

  /**
   * Get the current category from the link's hash.
   */
  init() {
    let hash = window.location.hash.slice(1)
    this.current = this.categories[0]
    if ( hash != "" ) {
      for ( let category of this.categories ) {
        let escapedCat = encodeURI(category.getAttribute("data-category"))
        if ( hash == escapedCat ) {
          this.change(category)
          return
        }
      }
    }
  }

  /**
   * Hide the links whose categories are not equal to the current category;
   * @param {element} category The current category.
   */
  filter(category) {
    for( let post of this.posts ) {
      let cat = post.getAttribute("data-category")
      if ( cat.indexOf(category) > -1 || category == "all" ) {
        post.style.display = "block"
      } else {
        post.style.display = "none"
      }
    }
  }

  /**
   * Add fade class to all the links except the hover one.
   * @param {element} target The hover item.
   */
  fadeAll(target) {
    for ( let post of this.posts ) {
      if ( post != target ) {
        post.classList.add("fade")
      }
    }
  }

  /**
   * Remove fade class of all the links.
   */
  unFadeAll() {
    for ( let post of this.posts ) {
      post.classList.remove("fade")
    }
  }

  /**
   * Change the current category.
   * @param {element} category The current category.
   */
  change(category) {
    this.current.classList.remove("active")
    this.current = category
    category.classList.add("active")
    this.filter(category.getAttribute("data-category"))
  }
}
