export default class Images {
	constructor( initialData ) {
		this._images = new Map();
		this._loading = [];

		for ( const name of Object.keys( initialData ) ) {
			this.add( name, initialData[ name ] );
		}
	}

	preload() {
		return Promise.all( this._loading );
	}

	add( name, path ) {
		if ( this._images.has( name ) ) {
			throw new Error( 'Image is already defined.' );
		}

		this._loading.push( loadImage( path ) );
		this._images.set( name, path );
	}

	get( name ) {
		return this._images.get( name );
	}
}

function loadImage( imagePath ) {
	return new Promise( ( resolve, reject ) => {
		const imageElement = new Image();

		imageElement.addEventListener( 'load', resolve );
		imageElement.addEventListener( 'error', reject );
		imageElement.src = imagePath;
	} );
}
