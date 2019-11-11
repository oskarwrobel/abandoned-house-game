import Storage from './storage';
import Item from './item';
import { createElement } from '../utils/createelement';

/* global appImages */

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
	 * @param {Object} options
	 * @param {Scene} options.back
	 */
	addScene( scene, { back } = {} ) {
		if ( this.scenes.has( scene ) ) {
			throw new Error( 'Cannot add the same scene twice.' );
		}

		this.scenes.add( scene );

		if ( back ) {
			const backButton = new Item( {
				image: appImages.backButton,
				width: 130,
				height: 50,
				attributes: {
					class: 'clickable'
				},
				events: {
					click: () => this.showScene( back )
				}
			} );

			scene.addItem( backButton, { scale: 1, top: 625, left: 1100 } );
		}
	}

	/**
	 * @param {Scene} scene
	 */
	showScene( scene ) {
		if ( !this.scenes.has( scene ) ) {
			throw new Error( 'Scene is not defined.' );
		}

		if ( this.currentScene ) {
			this.currentScene.fire( 'exit' );
			this._sceneWrapperElement.removeChild( this.currentScene.element );
		}

		this._sceneWrapperElement.appendChild( scene.element );
		this.currentScene = scene;
		this.currentScene.fire( 'enter' );
	}
}
