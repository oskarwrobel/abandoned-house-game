import Game from './game-engine/game';
import Scene from './game-engine/scene';
import Item from './game-engine/item';

import createDoor from './game-areas/createdoor';

import '../styles/app.scss';

/* global appImages */

const innerElement = document.querySelector( '#inner' );
const ratio = ( ( innerElement.clientWidth * 100 ) / 1280 ) / 100;

const game = new Game( { ratio } );
const sceneHall = new Scene( game, { id: 'hall', image: appImages.sceneHall } );
const sceneHallWall = new Scene( game, { id: 'paint', image: appImages.sceneHallWall } );
const sceneRoomBasement = new Scene( game, { id: 'room', image: appImages.sceneRoomBasement } );
const sceneRoomLight = new Scene( game, { id: 'room', image: appImages.sceneRoomLight } );

game.addScene( sceneHall );
game.addScene( sceneHallWall, { back: sceneHall } );
game.addScene( sceneRoomBasement, { back: sceneHall } );
game.addScene( sceneRoomLight, { back: sceneHall } );

const hallPaintLarge = new Item( {
	image: appImages.hallPaint,
	width: 440,
	height: 570,
	attributes: {
		class: 'clickable hall-paint',
	},
	events: {
		click: () => {
			hallPaintLarge.element.classList.toggle( 'rotated' );
			game.sounds.play( 'swipe' );
		}
	}
} );

sceneHall.on( 'exit', () => hallPaintLarge.element.classList.remove( 'rotated' ) );

const key = new Item( {
	image: appImages.key,
	width: 21.8,
	height: 52.2
} );

const doorA = createDoor( game, {
	targetScene: {}
} );

const doorB = createDoor( game, {
	targetScene: sceneRoomBasement,
	keys: [ key ]
} );

const doorC = createDoor( game, {
	targetScene: {}
} );

const doorD = createDoor( game, {
	targetScene: sceneRoomLight,
	isLocked: false
} );

const hallPaint = new Item( {
	image: appImages.hallPaint,
	width: 440,
	height: 570,
	attributes: {
		class: 'searchable'
	},
	events: {
		click: () => {
			game.sounds.play( 'button' );
			game.showScene( sceneHallWall );
		}
	}
} );

sceneHall.addArea( doorA, { points: [ [ 82, 660 ], [ 82, 228 ], [ 222, 228 ], [ 222, 599 ] ] } );
sceneHall.addArea( doorB, { points: [ [ 340, 542 ], [ 340, 226 ], [ 443, 226 ], [ 443, 498 ] ] } );
sceneHall.addArea( doorC, { points: [ [ 840, 498 ], [ 840, 226 ], [ 942, 226 ], [ 942, 542 ] ] } );
sceneHall.addArea( doorD, { points: [ [ 1060, 599 ], [ 1060, 228 ], [ 1200, 228 ], [ 1200, 660 ] ] } );
sceneHall.addItem( hallPaint, { scale: .28, top: 160, left: 582 } );

sceneHallWall.addItem( key, { scale: 2.5, top: 440, left: 730, takeable: true, droppable: true } );
sceneHallWall.addItem( hallPaintLarge, { left: 420, top: 80 } );

game.showScene( sceneHall );
innerElement.appendChild( game.element );
