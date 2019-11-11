import { createSvgElement } from '../utils/createelement';

export default class Area {
	constructor( { data, events, attributes = {} } = {} ) {
		this.data = data;

		this.events = events;

		this.element = this._render( attributes );
		this._attachEvents( events );
	}

	_render( attributes ) {
		if ( !attributes.fill ) {
			attributes.fill = 'transparent';
		}

		return createSvgElement( 'polygon', attributes );
	}

	set points( value ) {
		this.element.setAttribute( 'points', value );
	}

	_attachEvents( events = {} ) {
		for ( const name of Object.keys( events ) ) {
			if ( name === 'dropItem' ) {
				continue;
			}

			this.element.addEventListener( name, events[ name ], false );
		}
	}

	drop( item ) {
		if ( this.events.itemDrop ) {
			this.events.itemDrop( item );
		}
	}
}
