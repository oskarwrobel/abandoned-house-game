import Game from "../Game";
import Item, { ItemData } from "./Item";

export default class Items {
  game: Game;

  private itemById: Map<string, Item>;

  constructor(game: Game) {
    this.game = game;
    this.itemById = new Map();
  }

  create(data: ItemData) {
    return this.add(new Item(this.game, data));
  }

  add(item: Item) {
    if (this.itemById.has(item.id)) {
      throw new Error("Cannot add the same item more than once");
    }

    this.itemById.set(item.id, item);

    return item;
  }

  has(id: string) {
    return this.itemById.has(id);
  }

  get(id: string) {
    if (!this.has(id)) {
      throw new Error("Item not defined");
    }

    return this.itemById.get(id);
  }

  remove(id: string) {
    const item = this.get(id);
    item.destroy();
    this.itemById.delete(id);
  }
}
