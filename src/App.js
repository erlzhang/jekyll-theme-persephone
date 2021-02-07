export default class {
  constructor() {
    this.components = [];
  }

  addComponent(component) {
    this.components.push(component);
  }

  init() {
    document.addEventListener("turbo:load", () => {
      this.components.forEach(component => {
        component.active = component.canBeActive();
        if (component.active) {
          component.onPageLoad();
        }
      })
    });
  }
}