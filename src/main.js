import Game from "./game-engine/Game";
import assetsImages from "./game/assets/images";
import assetsSounds from "./game/assets/sounds";

import HallScene from "./game/scenes/hall/Hall";
import HallPaintScene from "./game/scenes/hall/HallPaint";
import RoomBasementScene from "./game/scenes/room-basement/RoomBasement";
import RoomBasementClosetScene from "./game/scenes/room-basement/RoomBasementCloset";
import RoomBasementClosetClosedScene from "./game/scenes/room-basement/RoomBasementClosetClosed";
import RoomBasementClosetClosedUnlockKeyScene from "./game/scenes/room-basement/RoomBasementClosetClosedUnlockCode";
import LightRoomScene from "./game/scenes/LightRoom";

import { showLoader, hideLoader } from "./loader/loader";

import "./main.css";
import "./game/game.css";

// Creates a game.
const game = new Game({
  resolution: "1600x900",
  images: assetsImages,
  sounds: assetsSounds,
});

showLoader();
Promise.all([game.sounds.preload(), game.images.preload()]).then(() => {
  hideLoader();

  // Scenes
  HallScene.create(game);
  HallPaintScene.create(game);
  RoomBasementScene.create(game);
  RoomBasementClosetScene.create(game);
  RoomBasementClosetClosedScene.create(game);
  RoomBasementClosetClosedUnlockKeyScene.create(game);
  LightRoomScene.create(game);

  // Set initial scene.
  game.scenes.show("hall");

  // Adjust game size each time screen properties have changed.
  window.addEventListener("resize", () => game.update());
  window.addEventListener("orientationchange", () => game.update());

  // Append game to the DOM.
  document.querySelector("#root").appendChild(game.element);
});
