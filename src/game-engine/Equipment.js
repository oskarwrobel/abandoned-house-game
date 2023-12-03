import { createSvgElement } from "./utils/createelement";

import "./Equipment.css";

const paddingV = 12;
const paddingH = 25;

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
   * @param {Object} options
   * @param {Boolean} options.droppable
   */
  addItem(idOrItem, { droppable = false } = {}) {
    const item = typeof idOrItem === "string" ? this.game.items.get(idOrItem) : idOrItem;

    item.top = paddingV;
    item.left = (this._lastItem?.right ?? 0) + paddingH;

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
   * @returns {Item|undefined}
   */
  get _lastItem() {
    return Array.from(this._items).pop();
  }

  /**
   * @private
   * @param {Item} item
   */
  _attachDragAndDrop(item) {
    let leftPositionInEquipment;
    let topGrbShift;
    let leftGrabShift;

    const dragItem = (evt) => {
      evt.preventDefault();
      evt.stopPropagation();

      leftPositionInEquipment = item.left;
      topGrbShift = evt.clientY - evt.target.getBoundingClientRect().top;
      leftGrabShift = evt.clientX - evt.target.getBoundingClientRect().left;

      this.isGrabbing = true;
      item.element.classList.add("dragging");
      this.game.element.classList.add("grabbing");
      document.addEventListener("mousemove", moveItem);
      document.addEventListener("click", dropItem);
      document.addEventListener("touchmove", moveItem);
      document.addEventListener("touchend", dropItem);
    };

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

      item.top = (clientY - gameBounds.top - topGrbShift) / this.game.sizeFactor;
      item.left = (clientX - gameBounds.left - leftGrabShift) / this.game.sizeFactor;
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
        item.top = paddingV;
        item.left = leftPositionInEquipment;
      }

      leftPositionInEquipment = null;
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
