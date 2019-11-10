import { createSvgElement } from './utils/createelement';

export default class Area {
	constructor( { data, events } ) {
		this.data = data;

		this.events = events;

		this.element = createSvgElement( 'polygon', { fill: 'transparent' } );
		this._attachEvents( events );
	}

	set points( value ) {
		this.element.setAttribute( 'points', value );
	}

	_attachEvents( events = {} ) {
		for ( const name of Object.keys( events ) ) {
			if ( name === 'click' ) {
				this.element.classList.add( 'clickable' );
				this.element.addEventListener( 'click', events[ name ], false );
			}
		}
	}

	handleDrop( item ) {
		if ( this.events.drop ) {
			this.events.drop( item );
		}
	}
}
