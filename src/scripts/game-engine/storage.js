import { createSvgElement } from '../utils/createelement';

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
		 * @readonly
		 * @type {Boolean}
		 */
		this.isGrabbing = false;

		/**
		 * @private
		 * @type {Set.<Item>}
		 */
		this._items = new Set();

		/**
		 * @type {SVGElement}
		 */
		this.element = createSvgElement( 'svg', { class: 'storage' } );
	}

	/**
	 * @param {String|Item} idOrItem
	 */
	addItem( idOrItem, { droppable = false } = {} ) {
		const item = typeof idOrItem === 'string' ? this.game.items.get( idOrItem ) : idOrItem;

		item.top = 12;
		item.left = 20 + this._getAvailableLeft();

		this._items.add( item );
		this.element.appendChild( item.element );

		if ( droppable ) {
			this._attachDragAndDrop( item );
		}
	}

	/**
	 * @param {String|Item} idOrItem
	 * @returns {Boolean}
	 */
	hasItem( idOrItem ) {
		const item = typeof idOrItem === 'string' ? this.game.items.get( idOrItem ) : idOrItem;

		return this._items.has( item );
	}

	/**
	 * @param {String|Item} idOrItem
	 */
	removeItem( idOrItem ) {
		const item = typeof idOrItem === 'string' ? this.game.items.get( idOrItem ) : idOrItem;

		if ( !this.hasItem( idOrItem ) ) {
			throw new Error( 'Item not exist.' );
		}

		this._items.delete( idOrItem );
		this.element.removeChild( item.element );
	}

	/**
	 * @private
	 * @returns {Number}
	 */
	_getAvailableLeft() {
		return Array.from( this._items ).reduce( ( result, item ) => ( result += ( item.width + 25 ) ), 0 );
	}

	/**
	 * @private
	 * @param {Item} item
	 */
	_attachDragAndDrop( item ) {
		let previousLeft;
		const { ratio, items } = this.game;

		const moveItemRef = evt => {
			if ( !previousLeft ) {
				previousLeft = item.left;
			}

			const percentageTop = ( evt.clientY * 100 ) / ( 720 * ratio );
			const percentageLeft = ( evt.clientX * 100 ) / ( 1280 * ratio );

			item.top = ( 720 * percentageTop ) / 100;
			item.left = ( 1280 * percentageLeft ) / 100;
		};

		const dropItemRef = evt => {
			evt.stopPropagation();

			const target = evt.target;

			this.isGrabbing = false;
			item.element.classList.remove( 'dragging' );
			this.game.element.classList.remove( 'grabbing' );
			document.removeEventListener( 'mousemove', moveItemRef );
			document.removeEventListener( 'click', dropItemRef );

			const isDropped = target.id && items.has( target.id ) && items.get( target.id ).drop( item );

			if ( !isDropped ) {
				item.top = 12;
				item.left = previousLeft;
			}

			previousLeft = null;
		};

		item.element.addEventListener( 'click', evt => {
			evt.stopPropagation();

			this.isGrabbing = true;
			item.element.classList.add( 'dragging' );
			this.game.element.classList.add( 'grabbing' );
			document.addEventListener( 'mousemove', moveItemRef );
			document.addEventListener( 'click', dropItemRef );
		} );
	}
}
