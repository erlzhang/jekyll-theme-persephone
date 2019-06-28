import Slider from './components/Slider.js'
import Summary from './components/Summary.js'
import Comment from './components/Comment.js'
import Archive from './components/Archive.js'

if ( document.getElementById("bookSummary") ) {
  const summary = new Summary()
}

if ( document.getElementById("sectionContainer") ) {
  const slider = new Slider()
}

if ( document.getElementById("postArchive") ) {
  const archive = new Archive()
}

initMermaid();

if ( document.getElementById("commentContainer") ) {
  const comment = new Comment()
}

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

  if( codes.length > 0 ) {
    mermaid.initialize({startOnLoad:true});
  }
}
