import Game from './game';
import Scene from './scene';
import Area from './area';
import Item from './item';

import '../styles/app.scss';

/* global appImages */

const innerElement = document.querySelector( '#inner' );
const ratio = ( ( innerElement.clientWidth * 100 ) / 1280 ) / 100;

const game = new Game( { ratio } );

const sceneHall = new Scene( game, { id: 'hall', image: appImages.hall } );
const sceneRoom = new Scene( game, { id: 'room', image: appImages.room } );

game.addScene( sceneHall );
game.addScene( sceneRoom );

const key = new Item( { id: 'key', image: appImages.key, width: 21.8, height: 52.2 } );

const leftDoor = new Area( {
	data: {
		isLocked: true,
		targetScene: sceneRoom
	},
	events: {
		click: () => {
			if ( !leftDoor.data.isLocked ) {
				game.showScene( leftDoor.data.targetScene );
			}
		},
		drop: item => {
			if ( item === key ) {
				leftDoor.data.isLocked = false;
				game.element.removeChild( item.element );

				return true;
			}
		}
	}
} );

const rightDoor = new Area( {
	data: {
		isLocked: true
	},
	events: {
		click: () => {},
	}
} );

sceneHall.addItem( key, { scale: 1, top: 220, left: 650, takeable: true } );
sceneHall.addArea( leftDoor, { points: [ [ 211, 170 ], [ 351, 170 ], [ 351, 543 ], [ 211, 604 ] ] } );
sceneHall.addArea( rightDoor, { points: [ [ 934, 170 ], [ 1074, 170 ], [ 1074, 604 ], [ 934, 544 ] ] } );

game.showScene( sceneHall );
innerElement.appendChild( game.element );
