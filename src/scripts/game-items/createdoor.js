export default function createDoor( game, { id, scene, coords, target, keys = [], isLocked } ) {
	const item = game.scenes.get( scene ).createItem( id, {
		coords,
		data: { isLocked },
		attributes: {
			classes: [ 'clickable' ]
		},
		events: {
			click: () => {
				if ( game.storage.isGrabbing ) {
					return;
				}

				if ( !item.data.isLocked ) {
					game.sounds.play( 'doorOpen' );
					game.scenes.show( target );
				} else {
					game.sounds.play( 'doorLocked' );
				}
			},
			dropItem: droppedItem => {
				if ( keys.includes( droppedItem.id ) || keys.includes( droppedItem ) ) {
					game.sounds.play( 'doorUnlock' );
					game.storage.removeItem( droppedItem );
					item.data.isLocked = false;

					return true;
				} else {
					game.sounds.play( 'doorLocked' );
				}
			}
		}
	} );

	return item;
}
