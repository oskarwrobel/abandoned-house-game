import Storage from './storage';
import Scenes from './scenes';
import Items from './items';
import Sounds from './sounds';
import { createElement } from '../utils/createelement';
import mix from '../utils/mix';
import EmitterMixin from '../utils/emittermixin';

/* global appSounds */

export default class Game {
	/**
	 * @param {Object} data
	 * @param {Number} data.ratio
	 */
	constructor( { ratio } ) {
		/**
		 * @readonly
		 * @type {Number}
		 */
		this.ratio = ratio;

		/**
		 * @readonly
		 * @type {Storage}
		 */
		this.storage = new Storage( this );

		/**
		 * @readonly
		 * @type {Set.<Scene>}
		 */
		this.items = new Items( this );

		/**
		 * @readonly
		 * @type {Set.<Scene>}
		 */
		this.scenes = new Scenes( this );

		/**
		 * @type {Sounds}
		 */
		this.sounds = new Sounds( appSounds );

		/**
		 * @type {HTMLElement}
		 */
		this.element = createElement( 'div', { class: 'game' } );
		this.element.appendChild( this.scenes.element );
		this.element.appendChild( this.storage.element );
	}
}

mix( Game, EmitterMixin );
