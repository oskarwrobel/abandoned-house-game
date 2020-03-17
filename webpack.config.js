'use strict';

/* eslint-env node */

const path = require( 'path' );
const { DefinePlugin } = require( 'webpack' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );

module.exports = ( env = {} ) => {
	const projectDir = path.dirname( __filename );

	const entry = [
		path.join( projectDir, 'src', 'scripts', 'app.js' )
	];

	if ( env.analytics ) {
		entry.push( path.join( projectDir, 'src', 'scripts', 'analytics.js' ) );
	}

	return {
		entry,

		output: {
			filename: '[name].[contenthash].js',
			path: path.join( process.cwd(), 'dist' ),
			publicPath: '/'
		},

		module: {
			rules: [
				{
					test: /\.css$/,
					use: [
						MiniCssExtractPlugin.loader,
						{
							loader: 'css-loader',
							options: {
								importLoaders: 1
							}
						},
						{
							loader: 'postcss-loader',
							options: {
								map: false,
								plugins: () => [
									require( 'postcss-nested' )
								]
							}
						}
					]
				},
				{
					test: /.(png|jpg|jpeg|gif|svg|wav|mp3|m4a)$/,
					use: 'file-loader'
				},
				{
					test: /\.html$/,
					use: {
						loader: 'html-loader',
						options: {
							interpolate: true
						}
					}
				}
			]
		},

		plugins: [
			new HtmlWebpackPlugin( {
				template: path.join( projectDir, 'src', 'index.html' ),
				filename: 'abandoned-house-game.html'
			} ),
			new MiniCssExtractPlugin( {
				filename: '[name].[contenthash].css'
			} ),
			new DefinePlugin( {
				ANALYTICS: JSON.stringify( env.analytics )
			} )
		]
	};
};
