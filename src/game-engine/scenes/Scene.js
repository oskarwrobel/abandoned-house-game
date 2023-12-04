import BackButton from "../../game/items/BackButton";
import { createSvgElement, Emitter, mix } from "../utils";

export default class Scene {
  /**
   * @param {Game} game
   * @param {Object} data
   * @param {String} data.id
   * @param {String} data.image
   */
  constructor(game, { id, image }) {
    /**
     * @type {Game}
     */
    this.game = game;

    /**
     * @type {String}
     */
    this.id = id;

    /**
     * @member {HTMLElement} #element
     */
    this.element = this._render({ id, image });
  }

  /**
   * @private
   * @param {String} id
   * @param {String} image
   * @returns {HTMLElement}
   */
  _render({ id, image }) {
    const element = createSvgElement("svg");

    if (this.game.images.get(image)) {
      image = this.game.images.get(image);
    }

    element.id = `scene-${id}`;
    element.classList.add("scene");
    element.style.backgroundImage = `url(${image})`;

    return element;
  }

  /**
   * @param {Object} data
   * @param {Object} data.id
   * @param {Number} data.top
   * @param {Number} data.left
   * @param {Number} data.width
   * @param {Number} data.height
   * @param {Boolean} [data.takeable=false]
   * @param {Boolean} [data.droppable=false]
   */
  createItem(data) {
    const item = this.game.items.create(data);

    this.addItem(item, data.coords);

    return item;
  }

  addItem(idOrItem, coords = {}) {
    const item = typeof idOrItem === "string" ? this.game.items.get(idOrItem) : idOrItem;

    item.element.remove();

    for (const property of Object.keys(coords)) {
      item[property] = coords[property];
    }

    this.element.appendChild(item.element);
  }

  removeItem(idOrItem) {
    const item = typeof idOrItem === "string" ? this.game.items.get(idOrItem) : idOrItem;
    this.game.items.remove(item.id);
  }

  addBackButton(backScene) {
    this.addItem(
      BackButton.create(this.game, {
        id: `${this.id}-back`,
        scene: this,
        backScene: this.game.scenes.get(backScene),
      }),
      BackButton.defaultPosition,
    );
  }
}

mix(Scene, Emitter);
