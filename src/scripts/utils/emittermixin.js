export default {
	_events: new Set(),

	on( eventName, callback ) {
		this._events.add( [ eventName, callback ] );
	},

	off( eventName, callback ) {
		for ( const entry of this._events ) {
			if ( entry[ 0 ] === eventName ) {
				if ( callback && entry[ 1 ] !== callback ) {
					continue;
				}

				this._events.delete( entry );
			}
		}
	},

	fire( eventName, ...args ) {
		for ( const entry of this._events ) {
			if ( entry[ 0 ] === eventName ) {
				entry[ 1 ]( ...args );
			}
		}
	}
};
