import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './Components/App'
// import './index.css'
// Redux
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './Components/reducers'

const store = configureStore({
  reducer: rootReducer, composeWithDevTools
})

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={store}>
  {/* <BrowserRouter> */}
    <App />
  {/* </BrowserRouter> */}
  </Provider>,        
// </React.StrictMode>
)
