import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { modalReducer } from './modal/slice';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const modalPersistConfig = {
  key: 'modal',
  storage,
};

export const store = configureStore({
  reducer: {
    showModal: persistReducer(modalPersistConfig, modalReducer),
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
