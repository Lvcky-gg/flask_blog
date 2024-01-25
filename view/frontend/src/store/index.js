import { configureStore } from "@reduxjs/toolkit";
import { loadingMiddleware } from "./loader";
import sessionReducer from "./session";
import postReducer from "./post";

import loadingReducer from "./loader";

const middleware = [loadingMiddleware];

if (process.env.NODE_ENV === "development") {
  const { logger } = require("redux-logger");
  middleware.push(logger);
}
const store = configureStore({
  reducer: {
    loading: loadingReducer,
    session: sessionReducer,
    posts: postReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
