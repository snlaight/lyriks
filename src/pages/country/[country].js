import { useContext } from 'react';
import { useRouter } from 'next/router';

import { useGetChartByCountryQuery } from '@services/shazamCoreApi';
import { GeolocationContext } from '@context/GeolocationContext';

import { SongList } from '@components/';

const CountryPage = () => {
  const { geoLocation } = useContext(GeolocationContext);

  const router = useRouter();
  const { country } = router.query;

  const { data, isFetching, error } = useGetChartByCountryQuery(
    geoLocation.country
  );

  return (
    <div className='h-full font-overpass overflow-y-auto scrollbar-w-4 scrollbar-thumb-phoenix-light-green scrollbar-thumb-rounded-xl'>
      {!isFetching && (
        <SongList heading={`${country} Top Songs`} songs={data} />
      )}
    </div>
  );
};

export default CountryPage;
