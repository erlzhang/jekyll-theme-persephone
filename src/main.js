import * as Turbo from "@hotwired/turbo"

console.log("Trubo", Turbo)

import Slider from './components/Slider.js'
import Summary from './components/Summary.js'
import Comment from './components/Comment.js'
import Archive from './components/Archive.js'
import ContentMenu from './components/ContentMenu.js'
import initMermaid from "./helpers/mermaid"

import App from "./App";

const app = new App()

app.addComponent(new Slider());
app.addComponent(new Summary());
app.addComponent(new Comment());
app.addComponent(new Archive());
app.addComponent(new ContentMenu());

app.init();

document.addEventListener("turbo:load", function() {
  initMermaid();
});

import './css/main.scss'