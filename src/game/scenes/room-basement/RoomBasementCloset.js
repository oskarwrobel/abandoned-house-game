import Scene from "../../../game-engine/scenes/Scene";

export default class RoomBasementCloset extends Scene {
  /**
   * @param {Game} game
   * @returns {Scene}
   */
  static create(game) {
    const scene = new this(game, {
      id: "room-basement-closet",
      image: "sceneRoomBasementCloset",
    });

    scene.createItem({
      id: "rubber-duck",
      attributes: {
        classes: ["clickable"],
      },
      coords: {
        top: 288,
        left: 594,
        shape: [
          [17, 9],
          [33, 12],
          [52, 0],
          [72, 7],
          [79, 26],
          [72, 47],
          [101, 50],
          [116, 45],
          [121, 53],
          [112, 78],
          [78, 106],
          [26, 102],
          [6, 90],
          [0, 71],
          [11, 45],
          [26, 37],
          [12, 22],
        ],
      },
      events: {
        click: () => game.sounds.play("rubberDuck"),
      },
    });

    scene.addBackButton("room-basement");

    return game.scenes.add(scene);
  }
}
