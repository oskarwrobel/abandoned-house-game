import Equipment from "./Equipment";
import Scenes from "./scenes/Scenes";
import Items from "./items/Items";
import Sounds from "./assets-storage/Sounds";
import Images from "./assets-storage/Images";
import { createElement } from "./utils/createelement";
import mix from "./utils/mix";
import EmitterMixin from "./utils/EmitterMixin";

export default class Game {
  /**
   * @param {Object} data
   * @param {String} data.resolution
   */
  constructor({ resolution, images, sounds }) {
    this.resolution = resolution;

    this.sizeFactor = 1;

    /**
     * @readonly
     * @type {Equipment}
     */
    this.equipment = new Equipment(this);

    /**
     * @readonly
     * @type {Items}
     */
    this.items = new Items(this);

    /**
     * @readonly
     * @type {Scenes}
     */
    this.scenes = new Scenes(this);

    /**
     * @type {Sounds}
     */
    this.sounds = new Sounds(sounds);

    /**
     * @type {Images}
     */
    this.images = new Images(images);

    /**
     * @type {HTMLElement}
     */
    this.element = createElement("div", { class: "game" });
    this.element.appendChild(this.scenes.element);
    this.element.appendChild(this.equipment.element);
    this.update();
  }

  update() {
    const [desiredWidth, desiredHeight] = this.resolution.split("x");
    const maxWidth = window.innerWidth;
    const maxHeight = window.innerHeight;
    const ratio = desiredWidth / desiredHeight;

    let optimalWidth = maxWidth;
    let optimalHeight = maxWidth / ratio;

    if (optimalHeight > maxHeight) {
      optimalWidth = maxHeight * ratio;
      optimalHeight = maxHeight;
    }

    this.sizeFactor = optimalWidth / desiredWidth;

    this.element.style.width = optimalWidth + "px";
    this.element.style.height = optimalHeight + "px";

    this.fire("update");
  }
}

mix(Game, EmitterMixin);
