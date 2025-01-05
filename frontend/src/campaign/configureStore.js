import {configureStore} from "@reduxjs/toolkit";
import {logger} from "redux-logger/src";
import createSagaMiddleware from "redux-saga"
const sagaMiddleware = createSagaMiddleware()

export const store = configureStore(({
    middleware: (gDM) => gDM.concat(logger,sagaMiddleware)
}))