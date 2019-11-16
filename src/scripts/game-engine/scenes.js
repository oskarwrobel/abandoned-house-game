import Scene from './scene';
import { createElement } from '../utils/createelement';

/* global appImages */

export default class Scenes {
	/**
	 * @param {Game} game
	 */
	constructor( game ) {
		/**
		 * @type {Game}
		 */
		this.game = game;

		/**
		 * @type {Scene|null}
		 */
		this.current = null;

		/**
		 * @type {HTMLElement}
		 */
		this.element = createElement( 'div', { class: 'scene-wrapper' } );

		/**
		 * @private
		 * @type {Map<String,Scene>}
		 */
		this._idToScene = new Map();
	}

	/**
	 * @param {String} id
	 * @param {Object} data
	 * @param {String} data.image
	 * @param {Scene|String} [data.back]
	 */
	create( id, { image, back } ) {
		if ( this._idToScene.has( id ) ) {
			throw new Error( 'Cannot add the same scene more than once.' );
		}

		const scene = new Scene( this.game, { id, image } );

		this._idToScene.set( id, scene );

		if ( back ) {
			scene.createItem( 'back-' + id, {
				attributes: {
					image: appImages.backButton,
					classes: [ 'clickable' ]
				},
				coords: {
					top: 625,
					left: 1100,
					points: [ [ 0, 0 ], [ 130, 0 ], [ 130, 50 ], [ 0, 50 ] ]
				},
				events: {
					click: () => {
						if ( this.game.storage.isGrabbing ) {
							return;
						}

						this.game.sounds.play( 'button' );
						this.show( back );
					}
				}
			} );
		}

		return scene;
	}

	show( id ) {
		if ( !this._idToScene.has( id ) ) {
			throw new Error( 'Scene is not defined.' );
		}

		if ( this.current ) {
			this.current.fire( 'exit' );
			this.current.element.remove();
		}

		const scene = this._idToScene.get( id );

		this.element.appendChild( scene.element );
		this.current = scene;

		scene.fire( 'enter' );
	}

	get( id ) {
		if ( !this._idToScene.has( id ) ) {
			throw new Error( 'Scene is not defined.' );
		}

		return this._idToScene.get( id );
	}
}
