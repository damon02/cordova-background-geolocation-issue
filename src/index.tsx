import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import './index.css'

/**
 * Test whether we're running as a cordova app (in that case the url is something like 'file://.......')
 */
export const isCordovaApp = window.location.href.indexOf('http://') === -1 && window.location.href.indexOf('https://') === -1

function onDeviceReady() {
  ReactDOM.render(<App />, document.getElementById('root'))
}

if (isCordovaApp) {
  document.addEventListener('deviceready', onDeviceReady, false)
} else {
  onDeviceReady()
}