import { Game } from "../Game";
import { createSvgElement, Emitter, mix } from "../utils";

const customEvents = new Set(["drop"]);

type ItemAttributes = {
  image?: string;
  classes?: string[];
  [key: string]: unknown;
};

type ItemEvents = {
  [key: string]: (...args: unknown[]) => void;
};

type ItemStates = {
  [key: string]: unknown;
};

export type ItemShape = [number, number][];

export type ItemCoords = {
  left: number;
  top: number;
  shape: ItemShape;
};

export type ItemConfig = {
  id: string;
  attributes: ItemAttributes;
  coords: ItemCoords;
  events: ItemEvents;
  states: ItemStates;
};

export interface Item extends Emitter {}

export class Item {
  game: Game;
  id: string;
  states: ItemStates;
  events: ItemEvents;
  element: SVGElement;

  private _left: number;
  private _top: number;
  private _angle: [number, number, number];
  private _shape: ItemShape;

  constructor(game: Game, data: ItemConfig) {
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

    this.updateCoords();
    this.game.on("update", () => this.updateCoords());

    this._attachEvents(events);
  }

  set top(value: number) {
    this._top = value;
    this.updateCoords();
  }

  get top() {
    return this._top;
  }

  set left(value) {
    this._left = value;
    this.updateCoords();
  }

  get left() {
    return this._left;
  }

  get right() {
    return this.left + this.width;
  }

  set shape(value: ItemShape) {
    this._shape = value;
    this.element.querySelector("polygon").setAttribute("points", this.shapeToPoints());
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

  private render({ image, classes = [] }: ItemAttributes = {}) {
    if (this.game.images.get(image)) {
      image = this.game.images.get(image);
    }

    const g = createSvgElement("g");
    const polygon = createSvgElement("polygon", { points: this.shapeToPoints() });

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

  private _attachEvents(events: ItemEvents) {
    for (const name of Object.keys(events)) {
      if (customEvents.has(name)) {
        this.on(name, events[name]);
      } else {
        this.element.addEventListener(name, events[name], false);
      }
    }
  }

  private shapeToPoints() {
    const sizeFactor = this.game.sizeFactor;

    return this._shape
      .map((point) => {
        const x = point[0] * sizeFactor + this._left * sizeFactor;
        const y = point[1] * sizeFactor + this._top * sizeFactor;

        return [x, y].join(",");
      })
      .join(" ");
  }

  private updateCoords() {
    const polygon = this.element.querySelector("polygon");
    const pattern = this.element.querySelector("pattern");

    polygon.setAttribute("points", this.shapeToPoints());

    if (pattern) {
      const ratio = this.game.sizeFactor;
      const left = this.left * ratio;
      const top = this.top * ratio;
      const width = this.width * ratio;
      const height = this.height * ratio;

      const image = pattern.querySelector("image");

      pattern.setAttribute("x", String(left));
      pattern.setAttribute("y", String(top));
      pattern.setAttribute("width", String(width));
      pattern.setAttribute("height", String(height));

      image.setAttribute("width", String(width));
      image.setAttribute("height", String(height));
    }

    const angle = [...this._angle];

    this._angle = [0, 0, 0];
    polygon.removeAttribute("transform");
    this.rotate(angle[0], angle[1], angle[2]);
  }
}

mix(Item, Emitter);
