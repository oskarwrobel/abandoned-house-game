export default class Images {
	constructor( initialData ) {
		this._images = new Map();

		for ( const name of Object.keys( initialData ) ) {
			this.add( name, initialData[ name ] );
		}
	}

	add( name, path ) {
		if ( this._images.has( name ) ) {
			throw new Error( 'Image is already defined.' );
		}

		this._images.set( name, path );
	}

	get( name ) {
		return this._images.get( name );
	}
}
