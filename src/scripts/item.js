import { createSvgElement } from './utils/createelement';

export default class Item {
	constructor( { id, width, height, image } ) {
		this.id = id;
		this.originWidth = width;
		this.originHeight = height;

		this.element = this._render( { id, image } );

		this.width = this.originWidth;
		this.height = this.originHeight;
	}

	_render( { id, image } ) {
		const element = createSvgElement( 'svg' );

		element.id = id;
		element.classList.add( 'item' );

		element.style.backgroundImage = `url(${ image })`;

		return element;
	}

	resetScale() {
		this.element.setAttribute( 'width', this.originWidth );
		this.element.setAttribute( 'height', this.originHeight );
		this.element.style.top = null;
		this.element.style.left = null;
	}

	set scale( value ) {
		this.element.setAttribute( 'width', value * this.originWidth );
		this.element.setAttribute( 'height', value * this.originHeight );
	}

	set top( value ) {
		this.element.style.top = value + 'px';
	}

	set left( value ) {
		this.element.style.left = value + 'px';
	}
}
