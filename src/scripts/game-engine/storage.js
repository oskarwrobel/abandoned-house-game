import { createElement } from '../utils/createelement';

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
		 * @private
		 * @type {Set.<Item>}
		 */
		this._items = new Set();

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
	 * @param {Object} [data={}]
	 * @param {Boolean} [data.droppable=false]
	 */
	addItem( item, { droppable } = {} ) {
		item.scale = this.game.ratio;

		item.top = 12 * this.game.ratio;
		item.left = ( 15 + this._getAvailableLeft() ) * this.game.ratio;

		this._items.add( item );
		this.game.element.appendChild( item.element );

		if ( droppable ) {
			this._attachDragAndDrop( item );
		}
	}

	/**
	 * @param {Item} item
	 * @returns {Boolean}
	 */
	hasItem( item ) {
		return this._items.has( item );
	}

	/**
	 * @param {Item} item
	 */
	removeItem( item ) {
		this._items.delete( item );
		this.game.element.removeChild( item.element );
	}

	_getAvailableLeft() {
		return Array.from( this._items ).reduce( ( result, item ) => ( result += ( item.width + 15 ) ), 0 );
	}

	/**
	 * @private
	 * @param {Item} item
	 */
	_attachDragAndDrop( item ) {
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

			if ( !hoveredArea || !hoveredArea.drop( item ) ) {
				item.top = 12 * this.game.ratio;
				item.left = ( 15 + this._getAvailableLeft() ) * this.game.ratio;
			}
		} );
	}
}
