export default class {
  constructor () {
    this.toggler = document.getElementById("summaryToggler")
    this.main = document.getElementById("bookMain")
    this.isOpen = false

    if( this.toggler ) {
      this.toggler.addEventListener("click", (event) => {
        this.toggle(event)
      })
    }
  }

  /**
   * Hide or show the summary left bar with a given click event.
   * @param {event} event A click event.
   */
  toggle (event) {
    event.preventDefault();
    if( this.isOpen ) {
      this.main.classList.remove("with-summary");
      this.toggler.classList.remove("active");
      this.isOpen = false;
    } else {
      this.main.classList.add("with-summary");
      this.toggler.classList.add("active")
      this.isOpen = true;
    }
    
  }
}
