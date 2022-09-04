import { useContext } from 'react';
import ReactAudioPlayer from 'react-audio-player';

import { CurrentlyPlayingContext } from '@context/CurrentyPlaying';

const AudioControls = ({ songSource }) => {
  return (
    <div className='cursor-pointer space-x-4'>
      <ReactAudioPlayer
        src={songSource}
        autoPlay
        controls
        style={{ width: '350px', background: '#71E5D6' }}
      />
    </div>
  );
};

const MusicPlayer = () => {
  const {
    isShowPlayer,
    setIsShowPlayer,
    isCurrentlyPlaying,
    setIsCurrentlyPlaying,
    songSourceToPlay,
  } = useContext(CurrentlyPlayingContext);

  if (!isShowPlayer || !songSourceToPlay) {
    return;
  }

  return (
    <div className='h-16 flexCenter w-auto space-x-4 rounded-lg minsm:rounded-none minsm:w-full fixed bottom-4 z-10 flex-row px-10 bg-phoenix-light-green'>
      <div className='space-x-0 h-10 w-10 '>
        <img
          src={isCurrentlyPlaying?.images.background}
          className='rounded-full'
        />
      </div>
      <div className='justify-start flex-col text-lyriks-dark-1'>
        <div className=''>{isCurrentlyPlaying?.title} </div>
        <div className='text-xs text-lyriks-dark-2'>
          {isCurrentlyPlaying?.subtitle}
        </div>
      </div>
      <div className='flex flex-auto justify-center text-2xl'>
        <AudioControls songSource={songSourceToPlay} />
      </div>
      <div className='justify-end text-lyriks-dark-2 hover:text-lyriks-dark-1'>
        <i
          className='fa-solid fa-xmark cursor-pointer'
          onClick={() => {
            setIsCurrentlyPlaying(null);
            setIsShowPlayer(false);
          }}
        />
      </div>
    </div>
  );
};

export default MusicPlayer;
