import HallScene from "./scenes/hall/Hall";
import HallPaintScene from "./scenes/hall/HallPaint";
import LightRoomScene from "./scenes/LightRoom";
import RoomBasementScene from "./scenes/room-basement/RoomBasement";
import RoomBasementClosetScene from "./scenes/room-basement/RoomBasementCloset";
import RoomBasementClosetClosedScene from "./scenes/room-basement/RoomBasementClosetClosed";
import RoomBasementClosetClosedUnlockKeyScene from "./scenes/room-basement/RoomBasementClosetClosedUnlockCode";

/**
 * @param {Game} game
 */
export function start(game) {
  HallScene.create(game);
  HallPaintScene.create(game);
  RoomBasementScene.create(game);
  RoomBasementClosetScene.create(game);
  RoomBasementClosetClosedScene.create(game);
  RoomBasementClosetClosedUnlockKeyScene.create(game);
  LightRoomScene.create(game);

  game.scenes.show("room-basement");
}
