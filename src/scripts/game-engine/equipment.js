import { createSvgElement } from "./utils/createelement";

const paddingTop = 12;
const paddingLeft = 25;

export default class Equipment {
  /**
   * @param {Game} game
   */
  constructor(game) {
    /**
     * @type {Game}
     */
    this.game = game;

    /**
     * @readonly
     * @type {Boolean}
     */
    this.isGrabbing = false;

    /**
     * @private
     * @type {Set.<Item>}
     */
    this._items = new Set();

    /**
     * @type {SVGElement}
     */
    this.element = createSvgElement("svg", { class: "equipment" });
  }

  /**
   * @param {String|Item} idOrItem
   */
  addItem(idOrItem, { droppable = false } = {}) {
    const item = typeof idOrItem === "string" ? this.game.items.get(idOrItem) : idOrItem;

    item.top = paddingTop;
    item.left = this._getAvailableLeft() + paddingLeft;

    this._items.add(item);
    this.element.appendChild(item.element);

    if (droppable) {
      this._attachDragAndDrop(item);
    }
  }

  /**
   * @param {String|Item} idOrItem
   * @returns {Boolean}
   */
  hasItem(idOrItem) {
    const item = typeof idOrItem === "string" ? this.game.items.get(idOrItem) : idOrItem;

    return this._items.has(item);
  }

  /**
   * @param {String|Item} idOrItem
   */
  removeItem(idOrItem) {
    const item = typeof idOrItem === "string" ? this.game.items.get(idOrItem) : idOrItem;

    if (!this.hasItem(idOrItem)) {
      throw new Error("Item not exist.");
    }

    this._items.delete(idOrItem);
    this.element.removeChild(item.element);
  }

  /**
   * @private
   * @returns {Number}
   */
  _getAvailableLeft() {
    return Array.from(this._items).reduce((result, item) => result + item.width + paddingLeft, 0);
  }

  /**
   * @private
   * @param {Item} item
   */
  _attachDragAndDrop(item) {
    let previousLeft;

    const moveItem = (evt) => {
      evt.preventDefault();

      let clientX, clientY;

      if (evt.touches) {
        const [touch] = evt.touches;

        clientX = touch.clientX;
        clientY = touch.clientY;
      } else {
        clientX = evt.clientX;
        clientY = evt.clientY;
      }

      const gameBounds = this.game.element.getBoundingClientRect();

      item.top = (clientY - gameBounds.top) / this.game.sizeFactor;
      item.left = (clientX - gameBounds.left) / this.game.sizeFactor;
    };

    const dropItem = (evt) => {
      evt.preventDefault();

      let clientX, clientY;

      if (evt.changedTouches) {
        const [touch] = evt.changedTouches;

        clientX = touch.clientX;
        clientY = touch.clientY;
      } else {
        clientX = evt.clientX;
        clientY = evt.clientY;
      }

      this.isGrabbing = false;
      item.element.classList.remove("dragging");
      this.game.element.classList.remove("grabbing");
      document.removeEventListener("mousemove", moveItem);
      document.removeEventListener("click", dropItem);
      document.removeEventListener("touchmove", moveItem);
      document.removeEventListener("touchend", dropItem);

      if (!this._checkDropTarget(item, clientX, clientY)) {
        item.top = paddingTop;
        item.left = previousLeft;
      }

      previousLeft = null;
    };

    const dragItem = (evt) => {
      evt.preventDefault();
      evt.stopPropagation();

      previousLeft = item.left;

      this.isGrabbing = true;
      item.element.classList.add("dragging");
      this.game.element.classList.add("grabbing");
      document.addEventListener("mousemove", moveItem);
      document.addEventListener("click", dropItem);
      document.addEventListener("touchmove", moveItem);
      document.addEventListener("touchend", dropItem);
    };

    item.element.addEventListener("click", dragItem);
    item.element.addEventListener("touchstart", dragItem);
  }

  _checkDropTarget(item, clientX, clientY) {
    const items = this.game.items;

    for (const element of document.elementsFromPoint(clientX, clientY)) {
      if (items.has(element.id) && items.get(element.id).fire("drop", item)) {
        return true;
      }
    }
  }
}
