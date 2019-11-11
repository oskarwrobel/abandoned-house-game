export default class Sounds {
	constructor( initialData ) {
		this._sounds = new Map();

		for ( const name of Object.keys( initialData ) ) {
			this.add( name, initialData[ name ] );
		}
	}

	add( name, path ) {
		if ( this._sounds.has( name ) ) {
			throw new Error( 'Sound already exist.' );
		}

		// TODO preloading
		this._sounds.set( name, new Audio( path ) );
	}

	play( name ) {
		this._sounds.get( name ).play();
	}
}
