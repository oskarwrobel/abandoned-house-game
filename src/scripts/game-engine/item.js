import { createSvgElement } from '../utils/createelement';

import mix from '../utils/mix';
import EmitterMixin from '../utils/emittermixin';

const customEvents = new Set( [ 'drop' ] );

export default class Item {
	constructor( game, { id, coords = {}, attributes = {}, events = {}, data = {} } ) {
		/**
		 * @type {Game}
		 */
		this.game = game;

		/**
		 * @type {String}
		 */
		this.id = id;

		/**
		 * @type {Object}
		 */
		this.data = data;

		/**
		 * @type {Object}
		 */
		this.events = events;

		/**
		 * @private
		 * @type {Number}
		 */
		this._left = 0;

		/**
		 * @private
		 * @type {Number}
		 */
		this._top = 0;

		/**
		 * @private
		 * @type {Array.<Number>}
		 */
		this._angle = [ 0, 0, 0 ];

		/**
		 * @private
		 * @type {Array.<Array.<Number>>}
		 */
		this._points = coords.points;

		/**
		 * @type {HTMLElement}
		 */
		this.element = this._render( attributes );

		this._updateCoords();
		this.game.on( 'refresh', () => this._updateCoords() );

		this._attachEvents( events );
	}

	/**
	 * @private
	 * @param {Object} attributes
	 * @returns {HTMLElement}
	 */
	_render( { image, classes = [] } = {} ) {
		const g = createSvgElement( 'g' );
		const polygon = createSvgElement( 'polygon', { points: this._pointsToString() } );

		if ( image ) {
			const patternElement = createSvgElement( 'pattern', {
				id: 'image-' + this.id,
				patternUnits: 'userSpaceOnUse'
			} );

			const imageElement = createSvgElement( 'image', {
				href: image
			} );

			polygon.setAttribute( 'fill', `url(#image-${ this.id })` );
			patternElement.appendChild( imageElement );
			g.appendChild( patternElement );
		} else {
			polygon.setAttribute( 'fill', 'transparent' );
		}

		g.appendChild( polygon );

		polygon.id = this.id;
		polygon.classList.add( 'item' );

		if ( classes.length ) {
			polygon.classList.add( classes.join( ',' ) );
		}

		return g;
	}

	set top( value ) {
		this._top = value;
		this._updateCoords();
	}

	get top() {
		return this._top;
	}

	set left( value ) {
		this._left = value;
		this._updateCoords();
	}

	get left() {
		return this._left;
	}

	set points( value ) {
		this._points = value;
		this.element.querySelector( 'polygon' ).setAttribute( 'points', this._pointsToString() );
	}

	get width() {
		return this._points.reduce( ( result, point ) => {
			if ( result < point[ 0 ] ) {
				return point[ 0 ];
			}

			return result;
		}, 0 );
	}

	get height() {
		return this._points.reduce( ( result, point ) => {
			if ( result < point[ 1 ] ) {
				return point[ 1 ];
			}

			return result;
		}, 0 );
	}

	get angle() {
		return this._angle[ 0 ];
	}

	rotate( angle, x, y ) {
		if ( this.angle === angle ) {
			return;
		}

		this._angle = [ angle, x, y ];

		if ( !x ) {
			x = this.left + ( this.width / 2 );
		} else {
			x += this.left;
		}

		if ( !y ) {
			y = this.top + ( this.height / 2 );
		} else {
			y += this.top;
		}

		x *= this.game.ratio;
		y *= this.game.ratio;

		this.element.querySelector( 'polygon' ).setAttribute( 'transform', `rotate(${ angle } ${ x } ${ y })` );
	}

	/**
	 * @private
	 * @param {Object} events
	 */
	_attachEvents( events = {} ) {
		for ( const name of Object.keys( events ) ) {
			if ( customEvents.has( name ) ) {
				this.on( name, events[ name ] );
			} else {
				this.element.addEventListener( name, events[ name ], false );
			}
		}
	}

	_pointsToString() {
		const ratio = this.game.ratio;

		return this._points.map( point => {
			const x = ( point[ 0 ] * ratio ) + ( this._left * ratio );
			const y = ( point[ 1 ] * ratio ) + ( this._top * ratio );

			return [ x, y ].join( ',' );
		} ).join( ' ' );
	}

	_updateCoords() {
		const polygon = this.element.querySelector( 'polygon' );
		const pattern = this.element.querySelector( 'pattern' );

		polygon.setAttribute( 'points', this._pointsToString() );

		if ( pattern ) {
			const ratio = this.game.ratio;
			const left = this.left * ratio;
			const top = this.top * ratio;
			const width = this.width * ratio;
			const height = this.height * ratio;

			pattern.setAttribute( 'x', left );
			pattern.setAttribute( 'y', top );
			pattern.setAttribute( 'width', width );
			pattern.setAttribute( 'height', height );
			pattern.childNodes[ 0 ].setAttribute( 'width', width );
			pattern.childNodes[ 0 ].setAttribute( 'height', height );
		}

		const angle = [ ...this._angle ];

		this._angle = [ 0, 0, 0 ];
		polygon.removeAttribute( 'transform' );
		this.rotate( angle[ 0 ], angle[ 1 ], angle[ 2 ] );
	}
}

mix( Item, EmitterMixin );
