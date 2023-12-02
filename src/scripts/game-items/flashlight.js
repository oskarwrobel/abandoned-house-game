import Item from "../game-engine/item";
import { createElement } from "../game-engine/utils/createelement";

const lightMaskSize = 2600;

export default class Flashlight extends Item {
  /**
   * @type {Game}
   */
  constructor(game, data = {}) {
    super(
      game,
      Object.assign(
        {
          id: "flashlight",
          attributes: {
            image: "flashlight",
          },
          coords: {
            shape: [
              [0, 0],
              [20, 0],
              [20, 49],
              [0, 49],
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
}
