import HitMap from './hitmap';

export default class Scene {
	/**
	 * @param {Game} game
	 * @param {Object} data
	 * @param {String} data.id
	 * @param {String} data.image
	 */
	constructor( game, { id, image } ) {
		/**
		 * @type {Game}
		 */
		this.game = game;

		/**
		 * @type {String}
		 */
		this.id = id;

		/**
		 * @type {Set<Area>}
		 */
		this.items = new Set();

		/**
		 * @member {HTMLElement} #element
		 */
		this.element = this._render( { id, image } );

		/**
		 * @type {HitMap}
		 */
		this.hitMap = new HitMap( { ratio: this.game.ratio } );
		this.element.appendChild( this.hitMap.element );

		/**
		 * @private
		 * @type {Object}
		 */
		this._refs = {};
	}

	/**
	 * @private
	 * @param {String} id
	 * @param {String} image
	 * @returns {HTMLDivElement}
	 */
	_render( { id, image } ) {
		const element = document.createElement( 'div' );

		element.classList.add( 'scene', `scene-${ id }` );
		element.style.backgroundImage = `url(${ image })`;

		return element;
	}

	/**
	 * @param {Area} area
	 * @param {Object} data
	 * @param {Array<Array.<Number>>} data.points
	 */
	addArea( area, { points } ) {
		area.points = parsePoints( points, this.game.ratio );
		this.hitMap.add( area );
	}

	/**
	 * @param {Item} item
	 * @param {Object} data
	 * @param {Number} data.scale
	 * @param {Number} data.top
	 * @param {Number} data.left
	 * @param {Boolean} data.takeable
	 */
	addItem( item, { scale, top, left, takeable } ) {
		if ( this.items.has( item ) ) {
			throw new Error( 'Item already defined' );
		}

		const { ratio } = this.game;

		item.top = top * ratio;
		item.left = left * ratio;
		item.scale = scale * ratio;

		this.items.add( item );
		this.element.appendChild( item.element );

		if ( takeable ) {
			this._refs.click = evt => {
				evt.stopPropagation();
				this.removeItem( item );
				this.game.storage.add( item );
			};

			item.element.addEventListener( 'click', this._refs.click, false );
		}
	}

	/**
	 * @param {Item} item
	 */
	removeItem( item ) {
		if ( !this.items.has( item ) ) {
			throw new Error( 'Cannot remove not existing item.' );
		}

		item.element.removeEventListener( 'click', this._refs.click );
		this.items.delete( item );
		this.element.removeChild( item.element );
	}
}

/**
 * @private
 * @param {Array.<Array.<Number>>} points
 * @param {Number} ratio
 * @returns {String}
 */
function parsePoints( points, ratio ) {
	points = points.map( point => point.map( value => ( value * ratio ) ) );

	points.forEach( point => point.join( ',' ) );
	points.join( ' ' );

	return points;
}