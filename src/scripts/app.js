import Game from './game-engine/game';
import Scene from './game-engine/scene';
import Item from './game-engine/item';
import Area from './game-engine/area';

import Flashlight from './game-items/flashlight';
import createDoor from './game-areas/createdoor';

import '../styles/app.scss';

/* global appImages */

const innerElement = document.querySelector( '#inner' );
const ratio = ( ( innerElement.clientWidth * 100 ) / 1280 ) / 100;

const game = new Game( { ratio } );
const sceneHall = new Scene( game, { id: 'hall', image: appImages.sceneHall } );
const scenePaint = new Scene( game, { id: 'paint', image: appImages.sceneHallPaint } );
const sceneRoom = new Scene( game, { id: 'room', image: appImages.sceneRoom } );

game.addScene( sceneHall );
game.addScene( scenePaint, { back: sceneHall } );
game.addScene( sceneRoom );

const flashlight = new Flashlight( game, {
	image: appImages.flashlight,
	width: 19.7,
	height: 51.7
} );

const key = new Item( {
	image: appImages.key,
	width: 21.8,
	height: 52.2
} );

const doorA = createDoor( game, {
	targetScene: sceneRoom,
	keys: [ key ]
} );

const doorB = createDoor( game, {
	targetScene: {}
} );

const doorC = createDoor( game, {
	targetScene: {}
} );

const doorD = createDoor( game, {
	targetScene: {}
} );

const paint = new Area( {
	attributes: {
		class: 'searchable'
	},
	events: {
		click: () => game.showScene( scenePaint )
	}
} );

//sceneHall.addItem( key, { scale: 1, top: 220, left: 650, takeable: true, droppable: true } );
//game.storage.addItem( flashlight );

sceneHall.addArea( doorA, { points: [ [ 82, 660 ], [ 82, 228 ], [ 222, 228 ], [ 222, 599 ] ] } );
sceneHall.addArea( doorB, { points: [ [ 340, 542 ], [ 340, 226 ], [ 443, 226 ], [ 443, 498 ] ] } );
sceneHall.addArea( doorC, { points: [ [ 840, 498 ], [ 840, 226 ], [ 942, 226 ], [ 942, 542 ] ] } );
sceneHall.addArea( doorD, { points: [ [ 1060, 599 ], [ 1060, 228 ], [ 1200, 228 ], [ 1200, 660 ] ] } );

sceneHall.addArea( paint, { points: [ [ 570, 327 ], [ 570, 180 ], [ 713, 180 ], [ 713, 327 ] ] } );

game.showScene( sceneHall );
innerElement.appendChild( game.element );
