import { useRouter, useState } from 'next/router';

import { useSearchQuery } from '@services/shazamApi';
import SongList from '@components/SongList';

const SearchPage = () => {
  const router = useRouter();
  const { searchValue } = router.query;

  const { data, isFetching, error } = useSearchQuery(searchValue);
  if (isFetching) {
    return <div className='min-h-screen flexCenter'> ... Loading ...</div>;
  }

  const { tracks, artists } = data;

  return (
    <div clasName='h-full'>
      <div className='space-y-8 pl-10 h-screen'>
        {data && (
          <>
            <div>
              <h1> Search results for "{searchValue}" </h1>
              <h3 className='pt-4'>Songs: </h3>
              {tracks.hits &&
                tracks.hits.map((track, index) => (
                  <div className='text-white' x={console.log(track)}>
                    <span> {index + 1} </span> -{' '}
                    <span> {track.track.title} </span> -{' '}
                    <span className='text-xs'> {track.track.subtitle} </span>
                  </div>
                ))}
            </div>
            <div>
              <h3>Artists:</h3>
              {artists.hits &&
                artists.hits.map((artist, index) => (
                  <div className='text-white'>
                    <span> {index + 1} </span> -{' '}
                    <span> {artist.artist.name} </span>
                  </div>
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
