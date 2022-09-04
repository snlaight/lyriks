import React, { useState, useEffect } from 'react';

export const CurrentlyPlayingContext = React.createContext();

export const CurrentlyPlayingProvider = ({ children }) => {
  const [isShowPlayer, setIsShowPlayer] = useState(false);
  const [isCurrentlyPlaying, setIsCurrentlyPlaying] = useState(null);
  const [songSourceToPlay, setSongSourceToPlay] = useState(null);



  useEffect(() => {
    if (isCurrentlyPlaying) {
      if (!isCurrentlyPlaying?.hub?.actions[1].uri) {
        setSongSourceToPlay(null);
      }
      setSongSourceToPlay(isCurrentlyPlaying?.hub?.actions[1]?.uri);
    }
  }, [songSourceToPlay, isCurrentlyPlaying]);

  return (
    <CurrentlyPlayingContext.Provider
      value={{
        isShowPlayer,
        setIsShowPlayer,
        isCurrentlyPlaying,
        setIsCurrentlyPlaying,
        songSourceToPlay,
      }}>
      {children}
    </CurrentlyPlayingContext.Provider>
  );
};
