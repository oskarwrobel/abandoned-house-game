'use strict';

/* eslint-env node */

const path = require( 'path' );
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );
const HtmlWebpackPlugin = require( 'html-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );

module.exports = () => {
	const entry = [
		path.join( process.cwd(), 'src', 'scripts', 'app.js' )
	];

	const webpackConfig = {
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
						'style-loader',
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
			new CleanWebpackPlugin(),
			new HtmlWebpackPlugin( {
				template: path.join( process.cwd(), 'src', 'index.html' )
			} ),
			new MiniCssExtractPlugin( {
				filename: '[name].[contenthash].css'
			} )
		]
	};

	return webpackConfig;
};
