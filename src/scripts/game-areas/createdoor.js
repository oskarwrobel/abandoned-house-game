import Area from '../game-engine/area';

export default function createDoor( game, { targetScene, keys = [] } ) {
	const door = new Area( {
		data: {
			isLocked: true
		},
		events: {
			click: () => {
				if ( !door.data.isLocked ) {
					game.showScene( targetScene );
				}
			},
			itemDrop: item => {
				if ( keys.includes( item ) ) {
					door.data.isLocked = false;
					game.storage.removeItem( item );

					return true;
				}
			}
		}
	} );

	return door;
}
