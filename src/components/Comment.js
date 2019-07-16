const $ = require("jquery");
window.jQuery = $;
import Cookies from 'js-cookie'

import Smiley from '../components/Smiley'
import Visitor from '../models/Visitor'
import DateTime from '../helpers/DateTime'

const MESSAGES = {
  disabled: "Enmmm..",
  error: "Something wrong!",
  enabled: "Go!",
  sending: "Going.." 
}

export default class {
  constructor () {
    this.list = document.getElementById("commentsList")

    this.form = document.getElementById("newComment")

    this.postURL = this.form.action 

    this.nameInput = document.getElementsByName("fields[name]")[0]
    this.emailInput = document.getElementsByName("fields[email]")[0]
    this.urlInput = document.getElementsByName("fields[url]")[0]
    this.parentInput = document.getElementsByName("fields[parent]")[0]
    this.replyToInput = document.getElementsByName("options[replyTo]")[0]
    this.messageArea = document.getElementsByName("fields[message]")[0]

    if ( document.getElementById("smileyContainer") ) {
      this.smiley = new Smiley(this.messageArea)
    }

    this.hintContainer = document.getElementById("commentHint")
    this.avatarImg = document.getElementById("visitorAvatar")

    this.submitBtn = document.getElementById("submitBtn")

    this.visitor = this.getVisitor()
    if ( this.visitor ) {
      this.initVisitorInfo()
    }

    this.disableBtn()

    this.messageArea.addEventListener("input", (e) => {
      if ( this.messageArea.value.length > 0 && this.submitBtn.disabled ) {
        this.enableBtn()
      } else if ( this.messageArea.value.length == 0 && !this.submitBtn.disabled ) {
        this.disableBtn()
      }
    })

    this.form.addEventListener("submit", (event) => {
      event.preventDefault()

      if ( !this.isValidate() ) {
        return;
      }

      if ( this.visitor ) {
        this.checkVisitorInfo() 
      } else {
        this.newVisitor()
      }

      this.disableBtn(true)
      const data = $(this.form).serialize()
      this.sendRequest(data)
    })

    $(".reply-btn").on("click", (event) => {
      let target = event.target.getAttribute("data-reply-to")
      let id = event.target.getAttribute("data-reply-id")
      this.reply(target, id)
    })

  }

  /**
   * Save the new visitor into cookie.
   */
  newVisitor () {
    this.visitor = new Visitor(this.nameInput.value, this.emailInput.value, this.urlInput.value)
    this.visitor.save()
  }

  /**
   * Init a Visitor from the cookie.
   */
  getVisitor () {
    let name = Cookies.get("name"),
        email = Cookies.get("email"),
        url = Cookies.get("url")

    if ( name ) {
      return new Visitor(name, email, url)
    }
  }

  /**
   * Update a visitor's info in the cookie if changed.
   */
  checkVisitorInfo () {
    if ( this.visitor.name != this.nameInput.value ) {
      this.visitor.set_name(this.nameInput.value)
    }
    if ( this.visitor.email != this.emailInput.value ) {
      this.visitor.set_email(this.emailInput.value)
    }
    if ( this.visitor.url!= this.urlInput.value ) {
      this.visitor.set_url(this.urlInput.value)
    }
  }

  /**
   * Fill in the inputs from the visitor's info.
   */
  initVisitorInfo () {
    this.nameInput.value = this.visitor.name
    this.emailInput.value = this.visitor.email || ""
    this.urlInput.value = this.visitor.url || ""
    this.avatarImg.src = this.visitor.avatar
  }

  /**
   * Post the comment to comment server.
   * @param {object} data
   */
  sendRequest (data) {
    $.ajax({
      url: this.postURL,
      type: "post",
      data: data,
      success: (res) => {
        this.disableBtn()
        this.addComment(res.fields)
        this.clearMessage()
      },
      error: () => {
        this.enableBtn()
        this.showError( MESSAGES["error"] )
      }
    })
  }

  /**
   * Add a peice of error message to the hint box.
   * @param {string} message The error message text.
   */
  showError (message) {
    this.hintContainer.innerText = message
    this.hintContainer.classList.add("comment__error")
  }

  /**
   * Clear all of the errors of the hint box.
   */
  clearError () {
    this.hintContainer.innerText = ""
    this.hintContainer.classList.remove("comment__error")
  }

  /**
   * Create a comment element and add it into the comments list.
   * @param {object} comment
   */
  addComment (comment) {
    let content = this.parseComment(comment) 
    let target

    if ( comment.parent ) {
      target = document.getElementById("comment-" + comment.parent)
      target.append(content)
    } else {
      target = this.list
      target.insertBefore(content, target.childNodes[0])
    }
    this.scrollTo(content)
  }

  /**
   * Compose the comment infos to a comment html element.
   * @param {object} comment
   * @return {element} The output html element.
   */
  parseComment (comment) {
    let div = document.createElement("div")
    div.classList.add("comment", "comment_new", "clearfix")

    let content = '<div class="comment-main"><div class="comment-left"><div class="comment__avatar"><img src="https://www.gravatar.com/avatar/' + comment.email + '?d=mm&s=45"></div></div>'
    content += '<div class="comment-right"><div class="comment__meta">'
    content += '<span class="comment__author">' + comment.name + '</span>'

    let dt = new DateTime(comment.date * 1000)
    let dt_str = dt.parse("yy-mm-dd HH:MM")
    content += '<span class="comment__date">' + dt_str + '</span>'

    content += '</div>'

    let message
    if ( this.smiley ) {
      message = this.smiley.parse(comment.message)
    } else {
      message = comment.message
    }
    content += '<div class="comment__content">' + message + '</div></div>'

    div.innerHTML = content
    return div
  }


  /**
   * If the input values are valid.
   */
  isValidate () {
    if (     !this.nameInput.value
          || !this.emailInput.value
          || !this.messageArea.value
       ) {
      return false
    } else {
      return true
    }
  
  }

  /**
   * Clear text in textarea, the reply infos and the hint messages.
   */
  clearMessage () {
    this.messageArea.innerText = ""
    this.messageArea.value = ""
    this.parentInput.value = ""
    this.replyToInput.value = ""
    this.hintContainer.innerText = ""
    this.clearError()
  }

  /**
   * Disable the submit button.
   * @param {bool} isInSubmit Whether it is disabled because of in submitting.
   */
  disableBtn (isInSubmit=false) {
    this.submitBtn.disabled = true
    if ( isInSubmit ) {
      this.submitBtn.innerHTML = MESSAGES["sending"]
    } else {
      this.submitBtn.innerHTML = MESSAGES["disabled"]
    }
  }

  /**
   * Enable the submit button.
   */
  enableBtn () {
    this.submitBtn.disabled = false
    this.submitBtn.innerHTML = MESSAGES["enabled"]
  }

  /**
   * Reply to a comment.
   * @param {string} index The relative index of the comment replied to.
   * @param {string} id The md5 of the email of the comment replied to.
   */
  reply (index, id) {
    let authorEle = document.querySelector("#comment-" + index + " .comment__author")
    let author = authorEle.innerText
    this.hintContainer.innerText = "@" + author
    this.parentInput.value = index;
    this.replyToInput.value = id
    this.messageArea.focus()
  }

  /**
   * Clear the reply infos.
   */
  cancleReply () {
    this.parentInput.value = ""
    this.hintContainer.innerText = ""
  }

  /**
   * Scroll the page to a given element.
   * @param {element} content The html element to be scrolled to.
   */
  scrollTo (content) {
    let t = content.offsetTop
    $("html, body").animate({
      scrollTop: t
    }, 450)
  }
}
