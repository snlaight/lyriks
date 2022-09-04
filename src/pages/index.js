import { useGetWorldChartQuery } from '@services/shazamCoreApi';
import { SongList } from '@components/';

const Home = () => {
  const { data, isFetching } = useGetWorldChartQuery();

  return (
    <div className='min-h-screen relative font-overpass '>
      {!isFetching && <SongList heading='Discover' songs={data} />}
    </div>
  );
};

export default Home;
