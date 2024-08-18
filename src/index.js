import reportWebVitals from './reportWebVitals';
import rerender from './rerender'
import {Provider} from "react-redux"
import {createStore, applyMiddleware} from "redux"
import {composeWithDevTools} from "redux-devtools-extension"

rerender()
reportWebVitals();
