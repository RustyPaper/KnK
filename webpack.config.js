const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const htmlWebpackPLuginConfig = new HtmlWebpackPlugin({
	template: path.join(process.cwd(),'frontEnd','index.html'),
	filename: 'index.html',
	inject: 'body'
})
module.exports={
	entry: path.join(process.cwd(),'frontEnd','index.js'),
	module: {
		rules:[{
			test: /\.js$/,
			exclude: /node_modules/,
			use: [{
				loader: 'babel-loader'
			}]
		}]
	},
	output: {
		filename: 'index.js',
		path: path.join(process.cwd(),'buildedFront')
	},
	plugins:[htmlWebpackPLuginConfig]
}