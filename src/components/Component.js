export default class {
  constructor() {
    this._active = false;
  }

  set active(val) {
    this._active = val;
  }

  get active() {
    return this._active;
  }

  bindEvent(target, name, handler) {
    target.addEventListener(name, (event) => {
      if (!this.active) {
        return;
      }

      handler.call(this, event);
    })
  }

  canBeActive() {
    return false;
  }

  onPageLoad() {

  }

  onVisited() {
  }

  beforeNavigated() {

  }
}