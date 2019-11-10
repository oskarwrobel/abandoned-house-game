import { createElement } from './utils/createelement';

export default class Storage {
	/**
	 * @param {Game} game
	 */
	constructor( game ) {
		/**
		 * @type {Game}
		 */
		this.game = game;

		/**
		 * @type {Set.<Item>}
		 */
		this.items = new Set();

		/**
		 * @type {SVGElement}
		 */
		this.element = this._render();
	}

	/**
	 * @private
	 */
	_render() {
		const element = createElement( 'div', { class: 'storage' } );

		element.style.height = this.game.ratio * 80 + 'px';

		return element;
	}

	/**
	 * @param {Item} item
	 */
	add( item ) {
		item.scale = this.game.ratio;
		item.top = 12 * this.game.ratio;
		item.left = 15 * this.game.ratio;

		this.items.add( item );
		this.game.element.appendChild( item.element );

		let isDragging = false;

		item.element.addEventListener( 'mousedown', () => {
			isDragging = true;
			item.element.classList.add( 'dragging' );
		} );

		document.addEventListener( 'mousemove', evt => {
			if ( !isDragging ) {
				return;
			}

			item.top = evt.clientY;
			item.left = evt.clientX;
		} );

		document.addEventListener( 'mouseup', () => {
			if ( !isDragging ) {
				return;
			}

			item.element.classList.remove( 'dragging' );
			isDragging = false;

			const hoveredArea = this.game.currentScene.hitMap.hoveredArea;

			if ( hoveredArea ) {
				hoveredArea.handleDrop( item );
			} else {
				item.top = 12 * this.game.ratio;
				item.left = 15 * this.game.ratio;
			}
		} );
	}

	/**
	 * @param {Item} item
	 */
	remove( item ) {
		this.items.delete( item );
		this.element.removeChild( item.element );
	}
}
