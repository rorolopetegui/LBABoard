/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import '@babel/polyfill'

// Import all the third party stuff
import React from 'react'
import ReactDOM from 'react-dom'
import 'sanitize.css/sanitize.css'

// Import root app
import App from './containers/App'

// Load the favicon and the .htaccess file
/* eslint-disable import/no-unresolved, import/extensions */
import '!file-loader?name=[name].[ext]!./images/favicon.ico'
import 'file-loader?name=.htaccess!./.htaccess'
/* eslint-enable import/no-unresolved, import/extensions */

const MOUNT_NODE = document.getElementById('app')

const render = () => {
  ReactDOM.render(<App />, MOUNT_NODE)
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install() // eslint-disable-line global-require
}

setTimeout(() => {
  render()
}, 0)
