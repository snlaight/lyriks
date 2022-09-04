import { useRouter } from 'next/router';

import { getCountryName } from '@utils/getCountryName';
import { useGetChartByCountryQuery } from '@services/shazamCoreApi';
import SongList from '@components/SongList';

const CountryIDPage = () => {
  const router = useRouter();
  const { countryId } = router.query;

  const { data, isFetching, error } = useGetChartByCountryQuery(countryId);
  const country = getCountryName(countryId);

  if (isFetching) {
    return <div> ... Loading ...</div>;
  }
  return (
    <div className='min-h-screen'>
      {!isFetching && (
        <SongList heading={`${country} Top Songs`} songs={data} />
      )}
    </div>
  );
};

export default CountryIDPage;
