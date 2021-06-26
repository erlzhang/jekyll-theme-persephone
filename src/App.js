export default class {
  constructor() {
    this.components = [];
  }

  addComponent(component) {
    this.components.push(component);
  }

  init() {
    document.addEventListener("turbo:load", (e) => {
      console.log("on turbo load", e);
      this.components.forEach(component => {
        component.active = component.canBeActive();
        if (component.active) {
          component.onPageLoad();
        }
      })
    });

    document.addEventListener("turbo:render", (e) => {
      console.log("on turbo render", e)
    })
  }
}