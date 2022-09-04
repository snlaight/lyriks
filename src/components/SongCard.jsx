import { useRouter } from 'next/router';
import { useContext } from 'react';

import { CurrentlyPlayingContext } from '@context/CurrentyPlaying';

const SongCard = ({ song }) => {
  const { setIsCurrentlyPlaying, setIsShowPlayer, isCurrentlyPlaying } =
    useContext(CurrentlyPlayingContext);

  const router = useRouter();

  return (
    <div className='flex-1 min-w-215 rounded-2xl px-4 m-4 minlg:m-8 sm:my-2 sm:mx-2 cursor-pointer text-transparent hover:text-white'>
      <div onClick={() => router.push(`/artist/${song?.artists[0]?.adamid}`)}>
        <div className='relative h-48 sm:h-36 minmd:h-60 minlg:h-300 rounded-br-2xl rounded-tl-2xl overflow-hidden'>
          <img src={song?.images?.background} objectFit='cover' layout='fill' />
        </div>
      </div>
      <div className='flex justify-between'>
        <div className='mt-3 flex flex-col'>
          <div onClick={() => router.push(`/related/${song.key}`)}>
            <p className='font-semibold minlg:text-xl text-white'>
              {song?.title}
            </p>
          </div>
          <div
            onClick={() => router.push(`/artist/${song?.artists[0]?.adamid}`)}>
            <div>
              <span className='text-xs text-slate-500'>{song?.subtitle}</span>
            </div>
          </div>
        </div>
        <div className='flex items-center '>
          {isCurrentlyPlaying === song ? (
            <i
              class='fa-regular fa-circle-pause fa-2xl text-white animate-none'
              onClick={() => {
                setIsCurrentlyPlaying(null);
              }}
            />
          ) : (
            isCurrentlyPlaying == null && (
              <i
                className='fa-regular fa-circle-play fa-2xl animate-pulse'
                onClick={() => {
                  setIsShowPlayer(true);
                  setIsCurrentlyPlaying(song);
                }}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default SongCard;
