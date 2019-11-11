import Item from '../game-engine/item';
import { createElement } from '../utils/createelement';

export default class Flashlight extends Item {
	/**
	 * @type {Game}
	 */
	constructor( game, { width, height, image } ) {
		super( {
			width, height, image,
			data: { isOn: false },
			events: {
				click: () => {
					if ( game.storage.hasItem( this ) ) {
						this.toggle();
					}
				}
			}
		} );

		/**
		 * @type {Game}
		 */
		this.game = game;

		/**
		 * @type {HTMLElement}
		 */
		this.lightElement = createElement( 'div', { class: 'flashlight' } );

		/**
		 * @private
		 * @method
		 * @param {MouseEvent} evt
		 */
		this._mouseMoveRef = evt => {
			this.lightElement.style.left = evt.clientX - 2500 + 'px';
			this.lightElement.style.top = evt.clientY - 2500 + 'px';
		};
	}

	toggle() {
		if ( !this.data.isOn ) {
			this.game.element.appendChild( this.lightElement );
			document.addEventListener( 'mousemove', this._mouseMoveRef );
		} else {
			this.game.element.removeChild( this.lightElement );
			document.removeEventListener( 'mousemove', this._mouseMoveRef );
		}

		this.data.isOn = !this.data.isOn;
	}
}
