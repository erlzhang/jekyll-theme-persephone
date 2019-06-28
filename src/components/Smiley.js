export default class Smiley {
  constructor (messageArea) {
    this.messageArea = messageArea
    this.eles = document.getElementsByClassName("comment__smiley")
    this.container = document.getElementById("smileyContainer")
    this.box = document.getElementById("smileyBox")
    this.smileys = {}
    this.isHidden = true

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

  show() {
    this.isHidden = false
    this.box.style.display = "block"
  }

  hide() {
    this.isHidden = true
    this.box.style.display = "none"
  }

  insert(tag) {
    tag = ' ' + tag + ' '
    this.messageArea.value += tag
    this.messageArea.focus()
  }

  parse(message) {
    var _this = this
    return message.replace(/:[a-z]+:/, ($0) => {
      return '<img src="' + _this.smileys[$0] + '"/>';
    })
  }
}
