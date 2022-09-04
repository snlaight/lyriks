import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

import { SHAZAM_API_URL, SHAZAM_API_HOST } from '@utils/constants';

const shazamApiKey = process.env.NEXT_PUBLIC_RAPID_API_KEY;

export const shazamApi = createApi({
  reducerPath: 'shazamApi',
  baseQuery: fetchBaseQuery({
    baseUrl: SHAZAM_API_URL,
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', shazamApiKey);
      headers.set('X-RapidAPI-Host', SHAZAM_API_HOST);
      return headers;
    },
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (build) => ({
    getCharts: build.query({
      query: () => 'charts/list',
    }),
    getArtistTopTracks: build.query({
      query: ({ artistId }) => `songs/list-artist-top-tracks?id=${artistId}`,
    }),
    search: build.query({
      query: (term) => `search?term=${term}&locale=en-US&limit=10`,
    }),
    getSongDetails: build.query({
      query: ({ key }) => `songs/get-details?key=${key}`,
    }),
    getChartTracks: build.query({
      query: (listId, pageSize, startFrom) =>
        `charts/track?listId=${listId}&pageSize=${pageSize}&startFrom=${startFrom}`,
    }),
  }),
});

export const {
  useGetChartsQuery,
  useGetArtistTopTracksQuery,
  useSearchQuery,
  useGetSongDetailsQuery,
  useGetSongCountQuery,
  useGetChartTracksQuery,
} = shazamApi;
