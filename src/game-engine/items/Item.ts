import Game from "../Game";
import { Coords, Events, Shape, States } from "../types";
import { createSvgElement } from "../utils/createelement";
import EmitterMixin from "../utils/EmitterMixin";
import mix from "../utils/mix";

const customEvents = new Set(["drop"]);

type ItemAttributes = {
  image?: string;
  classes?: string[];
  [key: string]: unknown;
};

export type ItemData = {
  id: string;
  attributes: ItemAttributes;
  coords: Coords;
  events: Events;
  states: States;
};

export interface Item extends EmitterMixin;

export class Item {
  game: Game;
  id: string;
  states: States;
  events: Events;
  element: HTMLElement;

  private _left: number;
  private _top: number;
  private _angle: [number, number, number];
  private _shape: Shape;

  constructor(game: Game, data: ItemData) {
    const { id, coords, attributes = {}, events = {}, states = {} } = data;

    this.game = game;
    this.id = id;
    this.states = states;
    this.events = events;
    this._left = 0;
    this._top = 0;
    this._angle = [0, 0, 0];
    this._shape = coords.shape;
    this.element = this.render(attributes);

    this._updateCoords();
    this.game.on("update", () => this._updateCoords());

    this._attachEvents(events);
  }

  private render({ image, classes = [] }: ItemAttributes = {}) {
    if (this.game.images.get(image)) {
      image = this.game.images.get(image);
    }

    const g = createSvgElement("g");
    const polygon = createSvgElement("polygon", { points: this._shapeToPoints() });

    if (image) {
      const patternElement = createSvgElement("pattern", {
        id: "image-" + this.id,
        patternUnits: "userSpaceOnUse",
      });

      const imageElement = createSvgElement("image", {
        href: image,
      });

      polygon.setAttribute("fill", `url(#image-${this.id})`);
      patternElement.appendChild(imageElement);
      g.appendChild(patternElement);
    } else {
      polygon.setAttribute("fill", "transparent");
    }

    g.appendChild(polygon);

    polygon.id = this.id;
    polygon.classList.add("item");

    if (classes.length) {
      polygon.classList.add(...classes);
    }

    return g;
  }

  set top(value: number) {
    this._top = value;
    this._updateCoords();
  }

  get top() {
    return this._top;
  }

  set left(value) {
    this._left = value;
    this._updateCoords();
  }

  get left() {
    return this._left;
  }

  get right() {
    return this.left + this.width;
  }

  get bottom() {
    return this.top + this.height;
  }

  set shape(value: Shape) {
    this._shape = value;
    this.element.querySelector("polygon").setAttribute("points", this._shapeToPoints());
  }

  get width() {
    return this._shape.reduce((result, point) => {
      if (result < point[0]) {
        return point[0];
      }

      return result;
    }, 0);
  }

  get height() {
    return this._shape.reduce((result, point) => {
      if (result < point[1]) {
        return point[1];
      }

      return result;
    }, 0);
  }

  get angle() {
    return this._angle[0];
  }

  rotate(angle: number, x: number, y: number) {
    if (this.angle === angle) {
      return;
    }

    this._angle = [angle, x, y];

    if (!x) {
      x = this.left + this.width / 2;
    } else {
      x += this.left;
    }

    if (!y) {
      y = this.top + this.height / 2;
    } else {
      y += this.top;
    }

    x *= this.game.sizeFactor;
    y *= this.game.sizeFactor;

    this.element.querySelector("polygon").setAttribute("transform", `rotate(${angle} ${x} ${y})`);
  }

  destroy() {
    this.element.remove();
  }

  /**
   * @private
   * @param {Object} events
   */
  _attachEvents(events = {}) {
    for (const name of Object.keys(events)) {
      if (customEvents.has(name)) {
        this.on(name, events[name]);
      } else {
        this.element.addEventListener(name, events[name], false);
      }
    }
  }

  _shapeToPoints() {
    const sizeFactor = this.game.sizeFactor;

    return this._shape
      .map((point) => {
        const x = point[0] * sizeFactor + this._left * sizeFactor;
        const y = point[1] * sizeFactor + this._top * sizeFactor;

        return [x, y].join(",");
      })
      .join(" ");
  }

  _updateCoords() {
    const polygon = this.element.querySelector("polygon");
    const pattern = this.element.querySelector("pattern");

    polygon.setAttribute("points", this._shapeToPoints());

    if (pattern) {
      const ratio = this.game.sizeFactor;
      const left = this.left * ratio;
      const top = this.top * ratio;
      const width = this.width * ratio;
      const height = this.height * ratio;

      pattern.setAttribute("x", left);
      pattern.setAttribute("y", top);
      pattern.setAttribute("width", width);
      pattern.setAttribute("height", height);
      pattern.childNodes[0].setAttribute("width", width);
      pattern.childNodes[0].setAttribute("height", height);
    }

    const angle = [...this._angle];

    this._angle = [0, 0, 0];
    polygon.removeAttribute("transform");
    this.rotate(angle[0], angle[1], angle[2]);
  }
}

mix(Item, EmitterMixin);
