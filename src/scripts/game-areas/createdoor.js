import Area from '../game-engine/area';

export default function createDoor( game, { targetScene, keys = [], isLocked = true } ) {
	const door = new Area( {
		data: { isLocked },
		events: {
			click: () => {
				if ( !door.data.isLocked ) {
					game.sounds.play( 'doorOpen' );
					setTimeout( () => game.showScene( targetScene ), 300 );
				} else {
					game.sounds.play( 'doorLocked' );
				}
			},
			itemDrop: item => {
				if ( keys.includes( item ) ) {
					game.sounds.play( 'doorUnlock' );
					door.data.isLocked = false;
					game.storage.removeItem( item );

					return true;
				}
			}
		},
		attributes: {
			class: 'clickable'
		}
	} );

	return door;
}
