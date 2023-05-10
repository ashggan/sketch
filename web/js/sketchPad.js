import draw from "../common/draw";
import { createCanvas } from "canvas";

const constants = {};
const canvas = createCanvas(400, 400);
const ctx = canvas.getContext("2d");


class SketchPad {
  constructor(container, size = 400) {
    this.canvas = document.createElement("canvas");
    this.canvas.width = size;
    this.canvas.height = size;
    this.canvas.style = `
      background-color:white;
      box-shadow: 0px 0px 2px 10px black;
    `;

    // insert canvas into the container div
    container.appendChild(this.canvas);

    // line break er
    const lb = document.createElement("br");
    container.appendChild(lb);

    // undo butoon
    this.undoBtn = document.createElement("button");
    this.undoBtn.style = "margin-top:30px";
    this.undoBtn.innerHTML = "Undo";
    container.appendChild(this.undoBtn);

    // create content var to start drawing in the canvas
    this.ctx = this.canvas.getContext("2d");

    // event listener to track the mouse movement
    this.#addEventListener();

    this.reset();
  }

  reset() {
    // the path @ type[[]]
    this.paths = [];
    this.isDrawing = false;
    this.#reDraw();
  }

  #addEventListener() {
    this.canvas.onmousedown = (evt) => {
      const mouse = this.#getmouseLoc(evt);
      this.paths.push([mouse]);
      this.isDrawing = true;
    };

    document.onmousemove = (evt) => {
      if (this.isDrawing) {
        const mouse = this.#getmouseLoc(evt);
        const lastPath = this.paths[this.paths.length - 1];
        lastPath.push(mouse);
        this.#reDraw();
      }
    };
    this.canvas.onmouseup = (evt) => {
      this.isDrawing = false;
    };

    // touch screen
    this.canvas.ontouchstart = (evt) => {
      const loc = evt.touches[0];
      this.canvas.onmousedown(loc);
    };

    document.ontouchmove = (evt) => {
      const loc = evt.touches[0];
      this.canvas.onmousemove(loc);
    };

    this.canvas.ontouchend = (evt) => {
      this.canvas.onmouseup();
    };

    // undo button
    this.undoBtn.onclick = () => {
      this.paths.pop();
      this.#reDraw();
    };
  }

  #reDraw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    draw.paths(this.ctx, this.paths);

    this.undoBtn.disabled = this.paths.length > 0 ? false : true;
  }

  #getmouseLoc(evt) {
    const rect = this.canvas.getBoundingClientRect();
    return [evt.clientX - rect.left, evt.clientY - rect.top];
  }
}
