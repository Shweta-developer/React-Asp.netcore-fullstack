import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { reducers1 } from "../reducers/index1";


export const store1 = createStore(
    reducers1,
    compose(
        applyMiddleware(thunk),
        //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
)