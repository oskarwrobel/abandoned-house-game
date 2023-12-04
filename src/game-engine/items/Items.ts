import { Game } from "../Game";
import { Item, ItemConfig } from "./Item";

export type IdOrItem = string | Item;

export class Items {
  game: Game;

  private itemById: Map<string, Item>;

  constructor(game: Game) {
    this.game = game;
    this.itemById = new Map();
  }

  create(data: ItemConfig) {
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

  remove(idOrItem: IdOrItem) {
    const item = typeof idOrItem === "string" ? this.game.items.get(idOrItem) : idOrItem;
    item.destroy();
    this.itemById.delete(item.id);
  }
}
