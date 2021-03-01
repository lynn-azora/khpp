//引入createStore创建Store

import {createStore} from 'redux'
import reducer from './../reducer'
import {composeWithDevTools} from 'redux-devtools-extension'

const configureStore = () => createStore(reducer,composeWithDevTools());
export default configureStore