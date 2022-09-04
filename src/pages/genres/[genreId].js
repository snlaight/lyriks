import React from 'react';

import { useGetChartTracksQuery } from '@services/shazamApi';
import { useRouter } from 'next/router';
import { SongList } from '@components/';

const Genre = () => {
  const {
    query: { genreId, genre },
  } = useRouter();

  const pageSize = 20;
  const startFrom = 0;

  const { data, isFetching } = useGetChartTracksQuery(
    genreId,
    pageSize,
    startFrom
  );

  return (
    <div className='min-h-screen font-overpass overflow-y-auto scrollbar-w-4 scrollbar-thumb-phoenix-light-green scrollbar-thumb-rounded-xl'>
      {!isFetching ? (
        <SongList heading={genre} songs={data.tracks} />
      ) : (
        <div className='flexCenter'>...Loading...</div>
      )}
    </div>
  );
};

export default Genre;
