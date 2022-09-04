import React from 'react';
import { useGetWorldChartQuery } from '@services/shazamCoreApi';
import { SongList } from '@components/';

const TopCharts = () => {
  const { data, isFetching } = useGetWorldChartQuery();

  return (
    <div className='h-full font-overpass '>
      {!isFetching && <SongList heading='Top Charts' songs={data} />}
    </div>
  );
};

export default TopCharts;
