import Scene from "../../../game-engine/scenes/Scene";
import BackButton from "../../items/BackButton";

export default class RoomBasement extends Scene {
  /**
   * @param {Game} game
   * @returns {Scene}
   */
  static create(game) {
    const roomBasementScene = new this(game, {
      id: "room-basement",
      image: "sceneRoomBasement",
    });

    roomBasementScene.createItem({
      id: "room-basement-closet",
      attributes: {
        classes: ["clickable"],
      },
      coords: {
        top: 224,
        left: 1250,
        shape: [
          [0, 16],
          [105, 0],
          [170, 7],
          [170, 178],
          [105, 192],
          [0, 160],
        ],
      },
      events: {
        click: () => {
          game.sounds.play("button");
          game.scenes.show("room-basement-closet");
        },
      },
    });

    roomBasementScene.addItem(
      BackButton.create(game, {
        id: "room-with-basement-back",
        scene: roomBasementScene,
        backScene: game.scenes.get("hall"),
      }),
      BackButton.defaultPosition,
    );

    return game.scenes.add(roomBasementScene);
  }
}
