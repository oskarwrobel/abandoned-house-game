export default function createDoor(game, { id, shape, target, keys = [], isLocked }) {
  const item = game.items.create({
    id,
    coords: { shape },
    states: { isLocked },
    attributes: {
      classes: ["clickable"],
    },
    events: {
      click: () => {
        if (game.equipment.isGrabbing) {
          return;
        }

        if (!item.states.isLocked) {
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
          item.states.isLocked = false;

          evt.return = true;
        } else {
          game.sounds.play("doorLocked");
        }
      },
    },
  });

  return item;
}
