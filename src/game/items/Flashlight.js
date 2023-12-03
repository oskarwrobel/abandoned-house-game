import Item from "../../game-engine/items/Item";
import { createElement } from "../../game-engine/utils/createelement";

import "./Flashlight.css";

const lightMaskSize = 3250;

export default class Flashlight extends Item {
  /**
   * @param game {Game}
   * @param data {Object}
   */
  constructor(game, data = { id: "flashlight" }) {
    super(
      game,
      Object.assign(
        {
          attributes: {
            image: "flashlight",
            classes: ["clickable"],
          },
          coords: {
            shape: [
              [0, 0],
              [25, 0],
              [25, 61],
              [0, 61],
            ],
          },
          events: {
            click: (evt) => {
              if (game.equipment.isGrabbing) {
                return;
              }

              if (game.equipment.hasItem(this)) {
                this.toggle(evt.clientX, evt.clientY);
              }
            },
          },
        },
        data,
      ),
    );

    /**
     * @private
     * @type {HTMLElement}
     */
    this._lightElement = createElement("div", { class: "flashlight" });

    /**
     * @private
     * @method
     * @param {MouseEvent} evt
     */
    this._mouseMoveRef = (evt) => {
      this._move(evt.clientX, evt.clientY);
    };

    this._touchRef = (evt) => {
      const [touch] = evt.touches;

      this._move(touch.clientX, touch.clientY);
      evt.preventDefault();
    };
  }

  _move(clientX, clientY) {
    const gameRect = this.game.element.getBoundingClientRect();
    const x = clientX - gameRect.left;
    const y = clientY - gameRect.top;

    const maskSize = lightMaskSize * this.game.sizeFactor;
    const shift = maskSize / 2;
    const diameter = 200 * this.game.sizeFactor;

    this._lightElement.style.width = maskSize + "px";
    this._lightElement.style.height = maskSize + "px";
    this._lightElement.style.left = x - shift + "px";
    this._lightElement.style.top = y - shift + "px";
    this._lightElement.style.backgroundImage = `radial-gradient( circle, transparent ${diameter}px, #000 ${
      diameter + 1
    }px )`;
  }

  toggle(x, y) {
    if (!this.states.isOn) {
      this.game.element.appendChild(this._lightElement);
      document.addEventListener("mousemove", this._mouseMoveRef);
      document.addEventListener("touchstart", this._touchRef, false);
      document.addEventListener("touchmove", this._touchRef, false);
      this._move(x, y);
    } else {
      this.game.element.removeChild(this._lightElement);
      document.removeEventListener("mousemove", this._mouseMoveRef);
      document.removeEventListener("touchstart", this._touchRef);
      document.removeEventListener("touchmove", this._touchRef);
    }

    this.game.sounds.play("flashlight");
    this.states.isOn = !this.states.isOn;
  }

  /**
   * @param game {Game}
   * @param data {Object|undefined}
   */
  static create(game, data) {
    const item = new this(game, data);
    return game.items.add(item);
  }
}
