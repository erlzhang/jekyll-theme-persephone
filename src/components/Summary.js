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

    const content = document.getElementById("chapter-content");

    const callback = (mutationsList, observer) => {
      for(let mutation of mutationsList) {
        if (mutation.type === 'childList') {
          if (mutation.addedNodes.length > 0) {
            const child = Array.from(mutation.addedNodes).find(node => node.tagName === "ARTICLE");
            if (child) {
              const name = child.getAttribute("data-chapter");
              const item = document.getElementById(`chapter-${name}`);
              if (item) {
                item.classList.add("active");
                this.current.classList.remove("active");
                this.current = item;
              }
            }
          }
        }
      }
    }

    const observer = new MutationObserver(callback)

    observer.observe(content, { attributes: true, childList: true, subtree: true })

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
