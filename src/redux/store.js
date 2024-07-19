import { configureStore } from '@reduxjs/toolkit';

import {
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
} from 'react-redux';


import { rootReducer } from './rootReducers';


const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});



const { dispatch } = store;

const useSelector = useAppSelector;

const useDispatch = () => useAppDispatch;

export { dispatch, store, useDispatch, useSelector };
