import Game from './game-engine/game';
import Flashlight from './game-items/flashlight';
import createDoor from './game-items/createdoor';

import '../styles/app.scss';

/* global appImages */

const element = document.querySelector( '#inner' );
const ratio = ( ( element.clientWidth * 100 ) / 1280 ) / 100;

const game = new Game( { ratio } );
const { scenes, items, sounds, storage } = game;

scenes.create( 'hall', { image: appImages.sceneHall } );
scenes.create( 'hall-paint', { image: appImages.sceneHallWall, back: 'hall' } );
scenes.create( 'room-with-basement', { image: appImages.sceneRoomBasement, back: 'hall' } );
scenes.create( 'room-light', { image: appImages.sceneRoomLight, back: 'hall' } );

scenes.get( 'hall' ).createItem( 'hall-paint', {
	attributes: {
		image: appImages.hallPaint,
		classes: [ 'searchable' ]
	},
	coords: {
		top: 180,
		left: 579,
		points: [ [ 0, 0 ], [ 123, 0 ], [ 123, 160 ], [ 0, 160 ] ]
	},
	events: {
		click: () => {
			if ( storage.isGrabbing ) {
				return;
			}

			sounds.play( 'button' );
			scenes.show( 'hall-paint' );
		}
	}
} );

scenes.get( 'hall-paint' ).createItem( 'hall-key', {
	attributes: {
		image: appImages.key,
		classes: [ 'clickable' ],
		droppable: true
	},
	coords: {
		points: [ [ 0, 0 ], [ 52, 0 ], [ 52, 130 ], [ 0, 130 ] ],
		top: 450,
		left: 730
	},
	events: {
		click: () => {
			if ( storage.isGrabbing || storage.hasItem( 'hall-key' ) ) {
				return;
			}

			const item = items.get( 'hall-key' );

			sounds.play( 'button' );
			item.points = [ [ 0, 0 ], [ 21, 0 ], [ 21, 52 ], [ 0, 52 ] ];
			storage.addItem( 'hall-key', { droppable: true } );
		}
	}
} );

scenes.get( 'hall-paint' ).createItem( 'hall-paint-large', {
	attributes: {
		image: appImages.hallPaint,
		classes: [ 'clickable', 'hall-paint' ]
	},
	coords: {
		left: 420,
		top: 80,
		points: [ [ 0, 0 ], [ 440, 0 ], [ 440, 570 ], [ 0, 570 ] ]
	},
	events: {
		click: () => {
			if ( storage.isGrabbing ) {
				return;
			}

			const paintLarge = items.get( 'hall-paint-large' );
			const paint = items.get( 'hall-paint' );

			if ( paintLarge.angle ) {
				paintLarge.rotate( 0, 220, 10 );
				paint.rotate( 0, 25, 3 );
			} else {
				paintLarge.rotate( 30, 220, 10 );
				paint.rotate( 18, 25, 5 );
			}

			sounds.play( 'swipe' );
		}
	}
} );

createDoor( game, {
	id: 'door-a',
	scene: 'hall',
	coords: {
		points: [ [ 82, 660 ], [ 82, 228 ], [ 222, 228 ], [ 222, 599 ] ]
	},
	isLocked: true
} );

createDoor( game, {
	id: 'door-b',
	scene: 'hall',
	coords: {
		points: [ [ 340, 542 ], [ 340, 226 ], [ 443, 226 ], [ 443, 498 ] ]
	},
	target: 'room-with-basement'
} );

createDoor( game, {
	id: 'door-c',
	scene: 'hall',
	coords: {
		points: [ [ 840, 498 ], [ 840, 226 ], [ 942, 226 ], [ 942, 542 ] ]
	},
	isLocked: true,
	target: 'room-light',
	keys: [ 'hall-key' ]
} );

createDoor( game, {
	id: 'door-d',
	scene: 'hall',
	coords: {
		points: [ [ 1060, 599 ], [ 1060, 228 ], [ 1200, 228 ], [ 1200, 660 ] ]
	},
	isLocked: true
} );

items.add( new Flashlight( game ) );
storage.addItem( 'flashlight' );

game.scenes.show( 'hall' );
element.appendChild( game.element );

window.addEventListener( 'resize', () => {
	game.ratio = ( ( element.clientWidth * 100 ) / 1280 ) / 100;
	game.fire( 'refresh' );
} );
