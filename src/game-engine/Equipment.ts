import { Game } from "game-engine/Game";
import { IdOrItem, Item } from "game-engine/items";

import { createSvgElement } from "./utils";

import "./Equipment.css";

type ItemConfig = {
  droppable: boolean;
};

export class Equipment {
  game: Game;
  isGrabbing: boolean = false;
  element: SVGElement;
  private items: Set<Item> = new Set();

  constructor(game: Game) {
    this.game = game;
    this.element = createSvgElement("svg", { class: "equipment" });
  }

  addItem(idOrItem: IdOrItem, config?: ItemConfig) {
    const { droppable } = config ?? {};
    const item = typeof idOrItem === "string" ? this.game.items.get(idOrItem) : idOrItem;

    item.top = paddingV;
    item.left = (this.lastItem?.right ?? 0) + paddingH;

    this.items.add(item);
    this.element.appendChild(item.element);

    if (droppable) {
      this.attachDragAndDrop(item);
    }
  }

  /**
   * @param {String|Item} idOrItem
   * @returns {Boolean}
   */
  hasItem(idOrItem: IdOrItem) {
    const item = typeof idOrItem === "string" ? this.game.items.get(idOrItem) : idOrItem;

    return this.items.has(item);
  }

  /**
   * @param {String|Item} idOrItem
   */
  removeItem(idOrItem: IdOrItem) {
    const item = typeof idOrItem === "string" ? this.game.items.get(idOrItem) : idOrItem;

    if (!this.hasItem(item)) {
      throw new Error("Item not exist");
    }

    this.items.delete(item);
    this.element.removeChild(item.element);
  }

  private get lastItem() {
    return Array.from(this.items.values()).pop();
  }

  private attachDragAndDrop(item: Item) {
    let leftPositionInEquipment: number;
    let topGrbShift: number;
    let leftGrabShift: number;

    const dragItem = (evt: MouseEvent | TouchEvent) => {
      evt.preventDefault();
      evt.stopPropagation();

      const { clientX, clientY } = getClientPosition(evt);

      leftPositionInEquipment = item.left;
      topGrbShift = clientY - (evt.target as Element).getBoundingClientRect().top;
      leftGrabShift = clientX - (evt.target as Element).getBoundingClientRect().left;

      this.isGrabbing = true;
      item.element.classList.add("dragging");
      this.game.element.classList.add("grabbing");
      document.addEventListener("mousemove", moveItem);
      document.addEventListener("touchmove", moveItem);
      document.addEventListener("click", dropItem);
      document.addEventListener("touchend", dropItem);
    };

    const moveItem = (evt: MouseEvent | TouchEvent) => {
      evt.preventDefault();

      const { clientX, clientY } = getClientPosition(evt);
      const gameBounds = this.game.element.getBoundingClientRect();

      item.top = (clientY - gameBounds.top - topGrbShift) / this.game.sizeFactor;
      item.left = (clientX - gameBounds.left - leftGrabShift) / this.game.sizeFactor;
    };

    const dropItem = (evt: MouseEvent | TouchEvent) => {
      evt.preventDefault();

      const { clientX, clientY } = getClientPosition(evt);

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

  _checkDropTarget(item: Item, clientX: number, clientY: number) {
    const items = this.game.items;

    for (const element of document.elementsFromPoint(clientX, clientY)) {
      if (items.has(element.id) && items.get(element.id).fire("drop", item)) {
        return true;
      }
    }
  }
}

const paddingV = 12;
const paddingH = 25;

function getClientPosition(evt: MouseEvent | TouchEvent) {
  let clientX, clientY;

  if ("changedTouches" in evt) {
    const touch = evt.changedTouches[0];

    clientX = touch.clientX;
    clientY = touch.clientY;
  } else {
    clientX = evt.clientX;
    clientY = evt.clientY;
  }

  return { clientX, clientY };
}
