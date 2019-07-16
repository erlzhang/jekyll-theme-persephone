import Cookies from 'js-cookie'
import md5 from 'blueimp-md5'

export default class {

  /**
   * @param {string} name
   * @param {string} email
   * @param {string} url Default is blank.
   */
  constructor (name, email, url="") {
    this.name = name
    this.email = email
    this.url = url
    this.avatar = this.get_avatar()

    this.EXPIRE_DAYS = 365
  }

  /**
   * Save the visitor's info into cookie.
   */
  save () {
    Cookies.set('name', this.name, { expires: this.EXPIRE_DAYS })  
    Cookies.set('email', this.email, { expires: this.EXPIRE_DAYS })
    Cookies.set('url', this.url, { expires: this.EXPIRE_DAYS })
  }

  /**
   * Set the visitor's name into cookies;
   */
  set_name (name) {
    this.name = name
    Cookies.set('name', this.name, { expires: this.EXPIRE_DAYS })  
  }

  /**
   * Set the visitor's email into cookies;
   */
  set_email (email) {
    this.email = email
    this.avatar = this.get_avatar()
    Cookies.set('email', this.email, { expires: this.EXPIRE_DAYS })  
  }

  /**
   * Set the visitor's url into cookies;
   */
  set_url (url) {
    this.url = url
    Cookies.set('url', this.url, { expires: this.EXPIRE_DAYS })
  }

  /**
   * Get the gravatar img of the visitor's email.
   */
  get_avatar () {
    var src = "https://www.gravatar.com/avatar/"
    src += md5(this.email)
    src += "?d=mm&s=45"
    return src;
  }
}
