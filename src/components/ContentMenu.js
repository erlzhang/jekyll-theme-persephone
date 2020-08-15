export default class {
  constructor() {
    this.heads = []
    this.init();
    this._current = null;

    window.onscroll = (e) => {
      const offset = window.scrollY;
      this.current = this.heads.find((head, index) => {
        const next = this.heads[index + 1];
        if (!next && offset > head.offset) {
          return true;
        }

        return offset >= head.offset &&
          offset < next.offset;
      });
    }
  }

  set current(value) {
    if (value == this._current) {
      return;
    }

    if (this._current) {
      this._current.nav.classList.remove("active");
    }

    if (value) {
      value.nav.classList.add("active");
    }

    this._current = value;
  }

  get current() {
    return this._current;
  }

  init() {
    let path = "";
    for (let i = 1; i <= 6; i++) {
      path += ".content h" + i;
      if (i < 6) {
        path += ", "
      }
    }

    const heads = document.querySelectorAll(path);
    const menu = document.querySelectorAll(".section-nav li");
    heads.forEach((head, index) => {
      this.heads.push({
        node: head,
        offset: head.offsetTop - 20,
        nav: menu[index]
      });
    });
  }
}
