import Item from '../game-engine/item';
import { createElement } from '../utils/createelement';

/* global appImages */

export default class Flashlight extends Item {
	/**
	 * @type {Game}
	 */
	constructor( game, data = {} ) {
		super( game, Object.assign( {
			id: 'flashlight',
			attributes: {
				image: appImages.flashlight
			},
			coords: {
				points: [ [ 0, 0 ], [ 20, 0 ], [ 20, 49 ], [ 0, 49 ] ]
			},
			events: {
				click: evt => {
					if ( game.storage.isGrabbing ) {
						return;
					}

					if ( game.storage.hasItem( this ) ) {
						this.toggle( evt.clientX, evt.clientY );
					}
				}
			}
		}, data ) );

		/**
		 * @private
		 * @type {HTMLElement}
		 */
		this._lightElement = createElement( 'div', { class: 'flashlight' } );

		/**
		 * @private
		 * @method
		 * @param {MouseEvent} evt
		 */
		this._mouseMoveRef = evt => {
			this._move( evt.clientX, evt.clientY );
		};
	}

	_move( x, y ) {
		this._lightElement.style.left = x - 2500 + 'px';
		this._lightElement.style.top = y - 2500 + 'px';
	}

	toggle( x, y ) {
		if ( !this.data.isOn ) {
			this.game.element.appendChild( this._lightElement );
			document.addEventListener( 'mousemove', this._mouseMoveRef );
			this._move( x, y );
		} else {
			this.game.element.removeChild( this._lightElement );
			document.removeEventListener( 'mousemove', this._mouseMoveRef );
		}

		this.game.sounds.play( 'flashlight' );
		this.data.isOn = !this.data.isOn;
	}
}
