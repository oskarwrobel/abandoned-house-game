import { Item } from "game-engine/items/Item";

export default class Door extends Item {
  static create(game, { id, shape, target, keys = [], isLocked, attributes = {}, events = {} }) {
    const doorItem = new this(game, {
      id,
      coords: { shape },
      states: { isLocked },
      attributes: {
        classes: ["clickable"],
        ...attributes,
      },
      events: {
        click: () => {
          if (game.equipment.isGrabbing) {
            return;
          }

          if (!doorItem.states.isLocked) {
            game.sounds.play("doorOpen");
            game.scenes.show(target);
          } else {
            game.sounds.play("doorLocked");
          }
        },
        drop: (evt, droppedItem) => {
          if (keys.includes(droppedItem.id) || keys.includes(droppedItem)) {
            game.sounds.play("doorUnlock");
            game.equipment.removeItem(droppedItem);
            doorItem.states.isLocked = false;
            events?.unlock();

            evt.return = true;
          } else {
            game.sounds.play("doorLocked");
          }
        },
      },
    });

    return game.items.add(doorItem);
  }
}
