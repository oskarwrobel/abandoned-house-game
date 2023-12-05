import { Game } from "game-engine/Game";
import { IdOrItem } from "game-engine/items";
import { Item, ItemConfig } from "game-engine/items/Item";
import { EventInfo } from "game-engine/utils";

export type DoorConfig = ItemConfig & {
  target?: string;
  keys?: IdOrItem[];
  isLocked?: boolean;
};

export class Door extends Item {
  constructor(game: Game, { keys, isLocked, target, ...config }: DoorConfig) {
    super(game, {
      ...config,
      states: { ...(config.states ?? {}), isLocked },
      attributes: {
        ...(config.attributes ?? {}),
        classes: ["clickable"],
      },
      events: {
        ...(config.events ?? {}),
        click: () => {
          if (game.equipment.isGrabbing) {
            return;
          }

          if (!this.states.isLocked) {
            game.sounds.play("doorOpen");
            game.scenes.show(target);
          } else {
            game.sounds.play("doorLocked");
          }
        },
        drop: (evt: EventInfo, droppedItem: Item) => {
          if (keys?.includes(droppedItem.id) || keys?.includes(droppedItem)) {
            game.sounds.play("doorUnlock");
            game.equipment.removeItem(droppedItem);
            this.states.isLocked = false;
            this.fire("unlock");

            evt.return = true;
          } else {
            game.sounds.play("doorLocked");
          }
        },
      },
    });
  }

  static create(game: Game, config: DoorConfig) {
    return game.items.add(new Door(game, config));
  }
}
