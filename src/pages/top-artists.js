import React from 'react';

import { useGetWorldChartQuery } from '@services/shazamCoreApi';

const TopArtists = () => {
  const { data, isFetching } = useGetWorldChartQuery();



  return <div className='h-screen'>TopArtists</div>;
};

export default TopArtists;
