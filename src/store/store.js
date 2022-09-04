import { configureStore } from '@reduxjs/toolkit';

import { shazamApi } from '@services/shazamApi';
import { shazamCoreApi } from '@services/shazamCoreApi';

export default configureStore({
  reducer: {
    [shazamApi.reducerPath]: shazamApi.reducer,
    [shazamCoreApi.reducerPath]: shazamCoreApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      shazamApi.middleware,
      shazamCoreApi.middleware
    ),
});
