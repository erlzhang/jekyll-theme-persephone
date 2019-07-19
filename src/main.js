import Slider from './components/Slider.js'
import Summary from './components/Summary.js'
import Comment from './components/Comment.js'
import Archive from './components/Archive.js'

import './css/main.scss'

if ( document.getElementById("bookSummary") ) {
  new Summary()
}

if ( document.getElementById("sectionContainer") ) {
  new Slider()
}

if ( document.getElementById("postArchive") ) {
  new Archive()
}

if ( document.getElementById("commentContainer") ) {
  new Comment()
}

initMermaid();

/**
 * Get all of the mermaid code block and transform them into the format can be parsed by mermaid.
 */
function initMermaid() {
  let codes = document.getElementsByClassName("language-mermaid");

  while( codes.length > 0 ) {
    let code = codes[0];
    let content = code.innerText;

    let chart = document.createElement("div");
    chart.className = "mermaid";  
    chart.innerHTML = content;

    let p = code.parentNode;
    while( p.tagName != "DIV" ) {
      p = p.parentNode;
    }

    p.replaceChild(chart, code.parentNode);
  }
}
