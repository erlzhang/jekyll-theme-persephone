import Component from './Component'

export default class extends Component {
  constructor () {
    super()
  }

  onPageLoad() {
    this.toggler = document.getElementById("summaryToggler")
    this.main = document.getElementById("bookMain")
    this.isOpen = false
    this.current = document.querySelector(".chapter-link.active");
    const summary = document.getElementsByClassName("summary")[0];
    summary.addEventListener("click", (e) => {  
      const target = e.target;
      this.current.classList.remove("active");
      target.classList.add("active");

      this.current = target;
    })
    this.main.addEventListener("click", (e) => {
      console.log("mian on click", e, e.target, e.target.classList)
      const target = e.target;
      if (target.classList.contains("navigation")) {
        const href = target.href;
        console.log("href", href);
        const item = document.querySelector(`.chapter[href=${href}]`);
        console.log("item", item);
        if (item) {
          item.classList.add("active");
          this.current.classList.remove("active");
          this.current = item;
        }
      }
    })

    if( this.toggler ) {
      this.toggler.addEventListener("click", (event) => {
        this.toggle(event)
      })
    }
  }

  canBeActive() {
    return !!document.getElementById("bookSummary");
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
