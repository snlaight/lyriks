import { useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { CurrentlyPlayingContext } from '@context/CurrentyPlaying';
import {
  useGetTrackDetailsQuery,
  useGetRelatedTracksQuery,
} from '@services/shazamCoreApi';

const RelatedSongs = () => {
  const { setIsCurrentlyPlaying, setIsShowPlayer } =
    useContext(CurrentlyPlayingContext);

  const router = useRouter();
  const { songId } = router.query;

  const {
    data: songDetails,
    isFetching,
    error,
  } = useGetTrackDetailsQuery(songId);

  const {
    data: relatedTracks,
    isFetching: isFetchingRelatedTracks,
    error: errorRelatedTracks,
  } = useGetRelatedTracksQuery(songId);

  if (isFetching && isFetchingRelatedTracks) {
    return (
      <div className='h-screen flexCenter relative font-overpass overflow-y-auto mx-auto scrollbar-w-4 scrollbar-thumb-phoenix-light-green scrollbar-thumb-rounded-xl'>
        ...Loading....
      </div>
    );
  }

  return (
    <div className='h-auto w-10/12 mx-auto pb-14'>
      <div>
        <h1 className='text-xl'>Song Details</h1>
        {songDetails && (
          <div className='flex flex-col'>
            <div className=' flex flex-row'>
              <div className='h-72 w-72 rounded-xl overflow-hidden'>
                <img
                  src={songDetails?.images?.coverart}
                  height={500}
                  width={500}
                />
              </div>
              <div className='flex justify-center ml-10 flex-col'>
                <span className='font-bold w-fit ease-in-out text-3xl cursor-pointer'>
                  {songDetails?.title}
                </span>
                <div
                  onClick={() => {
                    router.push(`/artist/${songDetails?.artists[0]?.adamid}`);
                  }}>
                  <span className='font-semibold hover:text-white w-fit ease-in-out  cursor-pointer text-base text-slate-400 '>
                    {songDetails?.subtitle}{' '}
                  </span>
                </div>
                <span className='text-phoenix-light-green w-fit hover:border-b ease-in-out border-phoenix-light-green cursor-pointer uppercase'>
                  {songDetails?.genres?.primary}{' '}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
      <div>
        <h1 className='text-3xl font-bold pt-14'>Related Songs</h1>
      </div>
      <div className='border rounded-md p-5 text-slate-300 space-y-6'>
        {!isFetchingRelatedTracks &&
          relatedTracks?.map((track, index) => (
            <div className='flex flex-col'>
              <div className=' flex flex-row'>
                <div className='h-16 w-16 rounded-xl relative group overflow-hidden'>
                  <div className='opacity-0 absolute flex flexCenter hover:opacity-100 inset-0 z-0 transition-opacity'>
                    {track?.hub?.actions ? (
                      <i
                        className='fa-regular fa-circle-play fa-2xl animate-pulse'
                        onClick={() => {
                          setIsShowPlayer(true);
                          setIsCurrentlyPlaying(track);
                        }}
                      />
                    ) : (
                      ''
                    )}
                  </div>
                  <div className='hover:opacity-50'>
                    <img src={track?.images?.coverart} />
                  </div>
                </div>
                <div className='flex justify-center flex-col ml-2'>
                  <Link href={`/related/${track?.key}`}>
                    <span className='font-bold w-fit hover:text-white ease-in-out cursor-pointer'>
                      {index + 1} - {track?.title}
                    </span>
                  </Link>
                  <div
                    onClick={() => {
                      router.push(`/artist/${track?.artists[0]?.adamid}`);
                    }}>
                    <span className='font-semibold hover:text-white w-fit ease-in-out  cursor-pointer text-base text-slate-400 '>
                      {track?.subtitle}{' '}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RelatedSongs;
