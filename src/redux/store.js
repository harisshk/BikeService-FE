import { createStore } from 'redux';
import combinedReducer from './reducer/index';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
const persistConfig = {
    key: 'root',
    storage,
  }
  const persistedReducer = persistReducer(persistConfig, combinedReducer)

export const store = createStore(persistedReducer), persistor = persistStore(store)