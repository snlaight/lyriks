import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { useGetArtistDetailsQuery } from '@services/shazamCoreApi';

const ArtistPage = () => {
  const router = useRouter();
  const { artistId } = router.query;

  const [albums, setAlbums] = useState([]);

  const { data, isFetching, error } = useGetArtistDetailsQuery(artistId);

  console.log(data?.songs);

  useEffect(() => {
    if (!isFetching) {
      setAlbums(data.albums);
    }
  }, [data]);

  return (
    <div className='min-h-screen pl-10'>
      <div>
        {isFetching ? (
          <div className='flexCenter min-h-screen'> ...Loading ...</div>
        ) : (
          <>
            <div className='flex space-x-8 '>
              <img
                src={data?.artists[artistId]?.attributes.artwork.url
                  .replace(
                    '{w}',
                    data?.artists[artistId]?.attributes.artwork.width
                  )
                  .replace(
                    '{h}',
                    data?.artists[artistId]?.attributes.artwork.height
                  )}
                className='rounded-lg border-none overflow-hidden h-56 w-56'
              />
              <p className='flexCenter text-3xl'>
                {' '}
                {data?.artists[artistId]?.attributes?.name}
              </p>
            </div>
            <div className='pt-6'>
              <div>
                <h1 className='text-xl text-slate-300 pb-4'>Top Songs</h1>
                <table className='table-auto w-full text-left'>
                  <thead className='text-slate-500 text-sm'>
                    <th>Name</th>
                    <th>Release Year</th>
                  </thead>
                  <tbody>
                    {Object.entries(data?.songs).map(([key, song], index) => (
                      <tr key={key} className='text-sm h-50'>
                        <td className='pb-2'>{song.attributes.name}</td>
                        <td>{song.attributes.releaseDate.slice(0, 4)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div>
                <h1 className='text-xl text-slate-300'>Released Albums</h1>
                <table className='table-auto w-full'>
                  <thead className='text-slate-500 text-sm'>
                    <th>Album</th>
                    <th>Release Year</th>
                    <th># of Tracks</th>
                  </thead>
                  <tbody>
                    {Object.entries(albums).map(([albumId, album], index) => (
                      <tr key={albumId} className='text-sm h-50 '>
                        <td className='pb-4 flex items-center'>
                          {index + 1}{' '}
                          <span className='mx-4'>
                            <img
                              src={album?.attributes?.artwork.url
                                .replace('{w}', '50')
                                .replace('{h}', '50')}
                              className='rounded-lg border-none overflow-hidden'
                            />
                          </span>{' '}
                          {album.attributes.name}{' '}
                        </td>
                        <td className='text-center'>
                          {album.attributes.releaseDate.slice(0, 4)}
                        </td>
                        <td className='text-center'>
                          {album.attributes.trackCount}{' '}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ArtistPage;
