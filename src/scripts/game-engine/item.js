import { createSvgElement } from '../utils/createelement';

export default class Item {
	constructor( { width, height, image, data, attributes, events } ) {
		/**
		 * @type {Number}
		 */
		this.originWidth = width;

		/**
		 * @type {Number}
		 */
		this.originHeight = height;

		/**
		 * @type {Object}
		 */
		this.data = data;

		/**
		 * @type {HTMLElement}
		 */
		this.element = this._render( { image, attributes } );

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

		// Set initial size.
		this.width = this.originWidth;
		this.height = this.originHeight;

		// Handle events.
		this._attachEvents( events );
	}

	/**
	 * @private
	 * @param {Object} data
	 * @param {String} data.image
	 * @param {Object} data.attributes
	 * @returns {HTMLElement}
	 */
	_render( { image, attributes } ) {
		const element = createSvgElement( 'svg', attributes );

		element.classList.add( 'item' );

		element.style.backgroundImage = `url(${ image })`;

		return element;
	}

	/**
	 * @private
	 * @param {Object} events
	 */
	_attachEvents( events = {} ) {
		for ( const name of Object.keys( events ) ) {
			this.element.addEventListener( 'click', events[ name ], false );
		}
	}

	resetScale() {
		this.element.setAttribute( 'width', this.originWidth );
		this.element.setAttribute( 'height', this.originHeight );
		this.element.style.top = null;
		this.element.style.left = null;
	}

	/**
	 * @param {Number} value
	 */
	set scale( value ) {
		this.element.setAttribute( 'width', value * this.originWidth );
		this.element.setAttribute( 'height', value * this.originHeight );
	}

	/**
	 * @type {Number} value
	 */
	set top( value ) {
		this._top = value;
		this.element.style.top = value + 'px';
	}

	get top() {
		return this._top;
	}

	/**
	 * @type {Number} value
	 */
	set left( value ) {
		this._left = value;
		this.element.style.left = value + 'px';
	}

	get left() {
		return this._left;
	}
}
