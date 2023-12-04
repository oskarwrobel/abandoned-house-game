import Images from "./assets-storage/Images";
import Sounds from "./assets-storage/Sounds";
import Equipment from "./Equipment";
import Items from "./items/Items";
import Scenes from "./scenes/Scenes";
import { createElement, Emitter, mix } from "./utils";

type Resolution = {
  x: number;
  y: number;
};

interface GameConfig {
  resolution: Resolution;
  images: Record<string, string>;
  sounds: Record<string, string>;
}

export interface Game extends Emitter {}
export class Game {
  resolution: Resolution;
  sizeFactor: number;
  equipment: Equipment;
  items: Items;
  scenes: Scenes;
  sounds: Sounds;
  images: Images;
  element: HTMLElement;

  constructor({ resolution, images, sounds }: GameConfig) {
    this.resolution = resolution;
    this.sizeFactor = 1;
    this.equipment = new Equipment(this);
    this.items = new Items(this);
    this.scenes = new Scenes(this);
    this.sounds = new Sounds(sounds);
    this.images = new Images(images);

    this.element = createElement("div", { class: "game" });
    this.element.appendChild(this.scenes.element);
    this.element.appendChild(this.equipment.element);
    this.update();
  }

  update() {
    const { x, y } = this.resolution;
    const maxWidth = window.innerWidth;
    const maxHeight = window.innerHeight;
    const ratio = x / y;

    let optimalWidth = maxWidth;
    let optimalHeight = maxWidth / ratio;

    if (optimalHeight > maxHeight) {
      optimalWidth = maxHeight * ratio;
      optimalHeight = maxHeight;
    }

    this.sizeFactor = optimalWidth / x;

    this.element.style.width = optimalWidth + "px";
    this.element.style.height = optimalHeight + "px";

    this.fire("update");
  }
}

mix(Game, Emitter);
