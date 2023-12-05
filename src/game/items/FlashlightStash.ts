import { Game } from "game-engine/Game";
import { Item } from "game-engine/items/Item";
import { createElement } from "game-engine/utils/createelement";

import "./FlashlightStash.css";

const lightMaskSize = 3250;

export class FlashlightStash extends Item {
  private lightElement = createElement("div", { class: "flashlight" });
  readonly mouseMoveRef: (evt: MouseEvent) => void;
  readonly touchRef: (evt: TouchEvent) => void;

  constructor(game: Game) {
    super(game, {
      id: "flashlight-stash",
      shape: [
        [0, 0],
        [25, 0],
        [25, 61],
        [0, 61],
      ],
      attributes: {
        image: "flashlight",
        classes: ["clickable"],
      },
      events: {
        click: (evt: MouseEvent) => {
          if (game.equipment.isGrabbing) {
            return;
          }

          if (game.equipment.hasItem(this)) {
            this.toggle(evt.clientX, evt.clientY);
          }
        },
      },
    });

    this.mouseMoveRef = (evt) => {
      this.move(evt.clientX, evt.clientY);
    };

    this.touchRef = (evt) => {
      const touch = evt.touches[0];

      this.move(touch.clientX, touch.clientY);
      evt.preventDefault();
    };
  }

  toggle(x: number, y: number) {
    if (!this.states.isOn) {
      this.game.element.appendChild(this.lightElement);
      document.addEventListener("mousemove", this.mouseMoveRef);
      document.addEventListener("touchstart", this.touchRef, false);
      document.addEventListener("touchmove", this.touchRef, false);
      this.move(x, y);
    } else {
      this.game.element.removeChild(this.lightElement);
      document.removeEventListener("mousemove", this.mouseMoveRef);
      document.removeEventListener("touchstart", this.touchRef);
      document.removeEventListener("touchmove", this.touchRef);
    }

    this.game.sounds.play("flashlight");
    this.states.isOn = !this.states.isOn;
  }

  private move(clientX: number, clientY: number) {
    const gameRect = this.game.element.getBoundingClientRect();
    const x = clientX - gameRect.left;
    const y = clientY - gameRect.top;

    const maskSize = lightMaskSize * this.game.sizeFactor;
    const shift = maskSize / 2;
    const diameter = 200 * this.game.sizeFactor;

    this.lightElement.style.width = maskSize + "px";
    this.lightElement.style.height = maskSize + "px";
    this.lightElement.style.left = x - shift + "px";
    this.lightElement.style.top = y - shift + "px";
    this.lightElement.style.backgroundImage = `radial-gradient( circle, transparent ${diameter}px, #000 ${
      diameter + 1
    }px )`;
  }

  static create(game: Game) {
    return game.items.add(new FlashlightStash(game));
  }
}
