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
              this.updateState(child);
            }
          }
        } else if (mutation.type === "attributes" && mutation.attributeName === "src") {
          console.log("muration", mutation)
          const ignore = content.getAttribute("ignore");
          if (!content.getAttribute("ignore")) {
            this.pushState(content);
          }
        }
      }
    }

    const observer = new MutationObserver(callback)

    observer.observe(content, { attributes: true, childList: true, subtree: true })

    // 监听浏览器前进后退事件
    window.addEventListener("popstate", (event) => {
      const state = event.state;
      if (state.chapter) {
        const container = document.getElementById("chapter-content");
        if (container) {
          content.innerHTML = state.nodes;
          content.setAttribute("ignore", true);
          document.title = state.title;
        } else {
          window.location.reload()
        }
      }
    })

    if( this.toggler ) {
      this.toggler.addEventListener("click", (event) => {
        this.toggle(event)
      })
    }
  }

  updateActiveLink(node) {
    console.log("in update active link");
    const name = node.getAttribute("data-chapter");
    const item = document.getElementById(`chapter-${name}`);
    if (item) {
      item.classList.add("active");
      if (this.current) {
        this.current.classList.remove("active");
      }
      this.current = item;
    }
  }

  pushState(parent) {
    console.log("in push state")
    const url = document.location.href;
    const title = document.title;
    const state = {'src': url, 'title': title, 'chapter': true, nodes: parent.innerHTML};
    history.pushState(state, '', url)
  }

  updateState(node) {
    console.log("in update state")
    const parent = node.parentNode;
    const url = parent.src;
    const title = node.getAttribute("data-title");
    this.updateActiveLink(node);
    const state = {'src': url, 'title': title, 'chapter': true, nodes: parent.innerHTML};
    history.replaceState(state, '', url)
    //history.pushState(state, '', url)
    document.title = title;
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
