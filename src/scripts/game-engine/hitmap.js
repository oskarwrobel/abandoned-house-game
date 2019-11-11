import { createSvgElement } from '../utils/createelement';

export default class HitMap {
	constructor() {
		/**
		 * Main svg element.
		 *
		 * @type {SVGElement}
		 */
		this.element = createSvgElement( 'svg', { width: '100%', height: '100%', class: 'hit-map' } );

		/**
		 * @readonly
		 * @type {Area|null}
		 */
		this.hoveredArea = null;

		/**
		 * List of all areas.
		 *
		 * @private
		 * @type {Map<Area>}
		 */
		this._items = new Set();
	}

	/**
	 * @param {Area} area
	 */
	add( area ) {
		this._items.add( area );
		this.element.appendChild( area.element );

		area.element.addEventListener( 'mouseenter', () => ( this.hoveredArea = area ) );
		area.element.addEventListener( 'mouseleave', () => {
			if ( this.hoveredArea === area ) {
				this.hoveredArea = null;
			}
		} );
	}

	/**
	 * Iterable interface.
	 *
	 * @returns {Iterable.<*>}
	 */
	[ Symbol.iterator ]() {
		return this._items.values()[ Symbol.iterator ]();
	}
}
