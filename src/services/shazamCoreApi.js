import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

import { SHAZAM_CORE_API_HOST, SHAZAM_CORE_API_URL } from '@utils/constants';

const shazamApiKey = process.env.NEXT_PUBLIC_RAPID_API_KEY;

export const shazamCoreApi = createApi({
  reducerPath: 'shazamCoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: SHAZAM_CORE_API_URL,
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', shazamApiKey);
      headers.set('X-RapidAPI-Host', SHAZAM_CORE_API_HOST);
      return headers;
    },
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (build) => ({
    getArtistDetails: build.query({
      query: (artistId) => `artists/details?artist_id=${artistId}`,
    }),
    getTrackDetails: build.query({
      query: (trackId ) => `tracks/details?track_id=${trackId}`,
    }),
    getRelatedTracks: build.query({
      query: (trackId ) => `tracks/related?track_id=${trackId}`,
    }),
    getWorldChartByGenre: build.query({
      query: (genreCode) => `charts/genre-world?genre_code=${genreCode}`,
    }),
    getChartByCountry: build.query({
      query: (countryCode) => `charts/country?country_code=${countryCode}`,
    }),
    getWorldChart: build.query({
      query: () => 'charts/world',
    }),
    getChartByGenreAndCountry: build.query({
      query: ({ countryCode, genreCode }) =>
        `charts/genre-country?country_code=${countryCode}&genre_code=${genreCode}`,
    }),
    getChartByCity: build.query({
      query: ({ cityId }) => `charts/city?city_id=${cityId}`,
    }),
  }),
});

export const {
  useGetArtistDetailsQuery,
  useGetTrackDetailsQuery,
  useGetRelatedTracksQuery,
  useGetWorldChartByGenreQuery,
  useGetChartByCountryQuery,
  useGetWorldChartQuery,
  useGetChartByGenreAndCountryQuery,
  useGetChartByCityQuery,
} = shazamCoreApi;
