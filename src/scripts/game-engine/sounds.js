const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContextConstructor();

export default class Sounds {
	constructor( initialData ) {
		this._sounds = new Map();

		for ( const name of Object.keys( initialData ) ) {
			this.add( name, initialData[ name ] );
		}
	}

	add( name, path ) {
		if ( this._sounds.has( name ) ) {
			throw new Error( 'Sound is already defined.' );
		}

		loadSound( path ).then( buffer => this._sounds.set( name, buffer ) );
	}

	play( name ) {
		if ( !this._sounds.has( name ) ) {
			throw new Error( 'Sound is not defined.' );
		}

		const src = audioContext.createBufferSource();

		src.buffer = this._sounds.get( name );

		const gain = audioContext.createGain();

		src.connect( gain );
		gain.connect( audioContext.destination );
		gain.gain.value = 1;

		src.start();
	}
}

function loadSound( url ) {
	return new Promise( resolve => {
		const req = new XMLHttpRequest();

		req.addEventListener( 'load', () => {
			audioContext.decodeAudioData( req.response, resolve );
		} );

		req.open( 'GET', url, true );
		req.responseType = 'arraybuffer';
		req.send();
	} );
}
