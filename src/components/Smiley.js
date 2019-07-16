export default class Smiley {

  /**
   * @param {element} messageArea The html element of textarea.
   * */
  constructor (messageArea) {
    this.messageArea = messageArea
    this.eles = document.getElementsByClassName("comment__smiley")
    this.container = document.getElementById("smileyContainer")
    this.box = document.getElementById("smileyBox")
    this.smileys = {}
    this.isHidden = true

    // Get all of the smileys and bind click events to them.
    let _this = this;
    for( let ele of this.eles ) {
      var tag = ele.getAttribute("data-smiley"),
          src = ele.getAttribute("data-src")

      this.smileys[tag] = src

      ele.onclick = function(event) {
        event.preventDefault()
        let tag = this.getAttribute("data-smiley")
        _this.insert(tag)
      }
    }

    // Bind mouse events to smiley box.
    this.container.addEventListener("mouseenter", () => {
      if ( this.isHidden ) {
        this.show()
      }
    })

    this.container.addEventListener("mouseleave", () => {
      if ( !this.isHidden ) {
        this.hide()
      }
    })
  }

  /**
   * Show the smileys.
   * */
  show() {
    this.isHidden = false
    this.box.style.display = "block"
  }

  /**
   * Hide the smileys.
   * */
  hide() {
    this.isHidden = true
    this.box.style.display = "none"
  }

  /**
   * Insert a smiley tag into the textarea.
   * @param {string} tag The tag of smiley to be inserted;
   * */
  insert(tag) {
    tag = ' ' + tag + ' '
    this.messageArea.value += tag
    this.messageArea.focus()
  }

  /**
   * Replace the smiley tags of images;
   * @param {string} message The message html;
   * @return {string} The output html.
   * */
  parse(message) {
    var _this = this
    return message.replace(/:[a-z]+:/, ($0) => {
      return '<img src="' + _this.smileys[$0] + '"/>';
    })
  }
}
