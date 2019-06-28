import Cookies from 'js-cookie'
import md5 from 'blueimp-md5'

export default class {
  constructor (name, email, url="") {
    this.name = name
    this.email = email
    this.url = url
    this.avatar = this.get_avatar()

    this.EXPIRE_DAYS = 365
  }

  save () {
    Cookies.set('name', this.name, { expires: this.EXPIRE_DAYS })  
    Cookies.set('email', this.email, { expires: this.EXPIRE_DAYS })
    Cookies.set('url', this.url, { expires: this.EXPIRE_DAYS })
  }

  set_name (name) {
    this.name = name
    Cookies.set('name', this.name, { expires: this.EXPIRE_DAYS })  
  }

  set_email (email) {
    this.email = email
    this.avatar = this.get_avatar()
    Cookies.set('email', this.email, { expires: this.EXPIRE_DAYS })  
  }

  set_url (url) {
    this.url = url
    Cookies.set('url', this.url, { expires: this.EXPIRE_DAYS })
  }

  get_avatar () {
    var src = "https://www.gravatar.com/avatar/"
    src += md5(this.email)
    src += "?d=mm&s=45"
    return src;
  }
}
