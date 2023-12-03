import Item from "./item";

export default class Items {
  /**
   * @param {Game} game
   */
  constructor(game) {
    /**
     * @type {Game}
     */
    this.game = game;

    /**
     * @private
     * @type {Map<String,Scene>}
     */
    this._idToItem = new Map();
  }

  /**
   * @param {Object} data
   */
  create({ id, attributes, coords, events, states }) {
    if (this._idToItem.has(id)) {
      throw new Error("Cannot add the same item more than once.");
    }

    const item = new Item(this.game, { id, attributes, coords, events, states });

    this._idToItem.set(id, item);

    return item;
  }

  add(item) {
    if (!(item instanceof Item)) {
      return new Error("Invalid Item instance.");
    }

    if (this._idToItem.has(item.id)) {
      throw new Error("Cannot add the same item more than once.");
    }

    this._idToItem.set(item.id, item);
    return item;
  }

  get(id) {
    if (!this.has(id)) {
      throw new Error("Item not defined");
    }

    return this._idToItem.get(id);
  }

  has(id) {
    return this._idToItem.has(id);
  }
}
