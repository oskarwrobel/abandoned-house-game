import Storage from './storage';
import { createElement } from './utils/createelement';

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
		this.scenes = new Set();

		/**
		 * @readonly
		 * @type {Scene|null}
		 */
		this.currentScene = null;

		/**
		 * @type {HTMLElement}
		 */
		this.element = createElement( 'div', { class: 'game' } );

		/**
		 * @private
		 * @type {HTMLElement}
		 */
		this._sceneWrapperElement = createElement( 'div', { class: 'scene-wrapper' } );

		this.element.appendChild( this._sceneWrapperElement );
		this.element.appendChild( this.storage.element );
	}

	/**
	 * @param {Scene} scene
	 */
	addScene( scene ) {
		if ( this.scenes.has( scene ) ) {
			throw new Error( 'Cannot add the same scene twice.' );
		}

		this.scenes.add( scene );
	}

	/**
	 * @param {Scene} scene
	 */
	showScene( scene ) {
		if ( this.currentScene ) {
			this._sceneWrapperElement.removeChild( this.currentScene.element );
		}

		this._sceneWrapperElement.appendChild( scene.element );
		this.currentScene = scene;
	}
}
