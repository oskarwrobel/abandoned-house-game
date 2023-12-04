import { Scene } from "game-engine/scenes";
import { wait } from "game-engine/utils";

const CHARACTER_SPACE = 33;

export default class RoomBasementClosetClosedUnlockKey extends Scene {
  currentValue = "";
  digits = [];

  createKeyItem({ value, top, left }) {
    return this.createItem({
      id: `room-basement-closet-unlock-key-${value}`,
      attributes: {
        classes: ["clickable"],
      },
      coords: {
        top,
        left,
        shape: [
          [0, 0],
          [90, 0],
          [90, 58],
          [0, 58],
        ],
      },
      events: {
        click: async () => {
          if (this.checking) {
            return;
          }

          this.game.sounds.play("keyBeep");

          if (value === null) {
            this.currentValue = "";
            this.updateDisplay();
            return;
          }

          this.currentValue += String(value);
          this.updateDisplay();

          if (this.currentValue.length < 3) {
            this.game.sounds.play("keyBeep");
            return;
          }

          this.checking = true;
          await wait(200);

          if (this.currentValue === "782") {
            await wait(300);
            this.game.sounds.play("keyBeepCorrect");
            await wait(1000);

            this.game.items.get("room-basement-closet").states.unlocked = true;
            this.game.sounds.play("closetDoors");
            await wait(300);

            this.game.scenes.show("room-basement-closet");
          } else {
            this.game.sounds.play("keyBeepWrong");
            await wait(300);

            this.currentValue = "";
            this.updateDisplay();
          }

          this.checking = false;
        },
      },
    });
  }

  updateDisplay() {
    this.digits.forEach((d) => this.removeItem(d));
    this.digits = [];

    const characters = Array.from(this.currentValue);
    const len = characters.length;
    const startLeft = 985 - len * CHARACTER_SPACE;

    this.digits = characters.map((character, index) => {
      return this.createItem({
        id: `code-key-${index}`,
        attributes: { image: `digit${character}` },
        coords: {
          left: startLeft + index * CHARACTER_SPACE,
          top: 166,
          shape: [
            [0, 0],
            [41, 0],
            [41, 55],
            [0, 50],
          ],
        },
      });
    });
  }

  /**
   * @param {Game} game
   * @returns {Scene}
   */
  static create(game) {
    const scene = new this(game, {
      id: "room-basement-closet-closed-unlock-key",
      image: "sceneRoomBasementClosetClosedUnlockCode",
    });

    scene.createKeyItem({ value: 1, left: 712, top: 240 });
    scene.createKeyItem({ value: 2, left: 815, top: 240 });
    scene.createKeyItem({ value: 3, left: 918, top: 240 });
    scene.createKeyItem({ value: 4, left: 712, top: 313 });
    scene.createKeyItem({ value: 5, left: 815, top: 313 });
    scene.createKeyItem({ value: 6, left: 918, top: 313 });
    scene.createKeyItem({ value: 7, left: 712, top: 386 });
    scene.createKeyItem({ value: 8, left: 815, top: 386 });
    scene.createKeyItem({ value: 9, left: 918, top: 386 });
    scene.createKeyItem({ value: null, left: 712, top: 459 });
    scene.createKeyItem({ value: 0, left: 815, top: 459 });

    scene.addBackButton("room-basement-closet-closed");

    return game.scenes.add(scene);
  }
}
