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
		if ( !this._sounds.has( name ) ) {
			throw new Error( 'Sound is not defined.' );
		}

		const sound = this._sounds.get( name );

		sound.currentTime = 0;
		sound.play();
	}
}
