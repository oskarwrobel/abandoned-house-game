import Game from './game-engine/game';
import Scene from './game-engine/scene';
import Item from './game-engine/item';

import Flashlight from './game-items/flashlight';
import createDoor from './game-areas/createdoor';

import '../styles/app.scss';

/* global appImages */

const innerElement = document.querySelector( '#inner' );
const ratio = ( ( innerElement.clientWidth * 100 ) / 1280 ) / 100;

const game = new Game( { ratio } );
const sceneHall = new Scene( game, { id: 'hall', image: appImages.hall } );
const scaryRoom = new Scene( game, { id: 'room', image: appImages.room } );

game.addScene( sceneHall );
game.addScene( scaryRoom );

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

const leftDoor = createDoor( game, {
	targetScene: scaryRoom,
	keys: [ key ]
} );

const rightDoor = createDoor( game, {} );

sceneHall.addItem( key, { scale: 1, top: 220, left: 650, takeable: true, droppable: true } );
sceneHall.addItem( flashlight, { scale: 1, top: 300, left: 500, takeable: true } );
sceneHall.addArea( leftDoor, { points: [ [ 211, 170 ], [ 351, 170 ], [ 351, 543 ], [ 211, 604 ] ] } );
sceneHall.addArea( rightDoor, { points: [ [ 934, 170 ], [ 1074, 170 ], [ 1074, 604 ], [ 934, 544 ] ] } );

game.showScene( sceneHall );
innerElement.appendChild( game.element );
