import { configureStore } from '@reduxjs/toolkit';
import testReducer from './testSlice';
import notificationReducer from './notificationSlice';

const store = configureStore({
  reducer: {
    test: testReducer,
    notification: notificationReducer,
  },
});

export default store;