export default function createBackButton(game, { id, backScene }) {
  return game.items.create({
    id,
    attributes: {
      image: "backButton",
      classes: ["clickable"],
    },
    coords: {
      shape: [
        [0, 0],
        [130, 0],
        [130, 50],
        [0, 50],
      ],
    },
    events: {
      click: () => {
        if (game.equipment.isGrabbing) {
          return;
        }

        game.sounds.play("button");
        game.scenes.show(backScene);
      },
    },
  });
}
