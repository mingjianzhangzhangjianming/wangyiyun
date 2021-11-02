import React from 'react'
import ReactDOM from 'react-dom'
import { GlobalStyle } from './GlobalStyle'

import('./App.js').then(({ App }) => {
    ReactDOM.render(
        <>
            <React.StrictMode>
                <GlobalStyle />
                <App />
            </React.StrictMode>
            ,
        </>,
        document.getElementById('root')
    )
})
