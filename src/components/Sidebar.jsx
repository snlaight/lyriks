import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

import { Genres, MusicPlayer, Countries, Search } from '@components';

import images from '@assets/';

import { useGetChartsQuery } from '@services/shazamApi';
import { GeolocationContext } from '@context/GeolocationContext';
import { getCountryName } from '@utils/getCountryName';

const MenuItems = () => {
  const [active, setActive] = useState('Home');

  const {
    geoLocation: { country },
  } = useContext(GeolocationContext);

  const userCountry = getCountryName(country);

  const generateLinksAndIcons = (i) => {
    switch (i) {
      case 0:
        return { link: '/', icon: 'fas fa-house' };
      case 1:
        return { link: '/top-charts', icon: 'fas fa-arrow-trend-up' };
      case 2:
        return { link: '/top-artists', icon: 'fas fa-music' };
      case 3:
        return {
          link: `/country/${userCountry}`,
          icon: 'fa-solid fa-map-location-dot',
        };
      default:
        return {
          link: '/',
          icon: 'fas fa-house',
        };
    }
  };

  return (
    <ul className='list-none px-4 font-overpass flex-col space-y-7'>
      {['Home', 'Top Charts', 'Top Artists', `${userCountry}`].map(
        (item, i) => (
          <div
            key={i}
            className={`flex flex-row space-x-4 ${
              active === item
                ? 'text-phoenix-light-green border-b-2 border-phoenix-light-green rounded-br-lg'
                : ''
            }`}
            onClick={() => setActive(item)}>
            <i className={generateLinksAndIcons(i).icon} />
            <li key={i} className=' text-sm uppercase align-middle'>
              <Link href={generateLinksAndIcons(i).link}>{item}</Link>
            </li>
          </div>
        )
      )}
    </ul>
  );
};

const Sidebar = ({ children }) => {
  const [activeGenre, setActiveGenre] = useState('');
  const [show, setShow] = useState(true);
  const [genres, setGenres] = useState([]);

  const { data, isFetching, error } = useGetChartsQuery();

  useEffect(() => {
    if (!isFetching) {
      setGenres(data.global.genres);
    }
  }, [data]);

  return (
    <div className='flex font-overpass'>
      {show && (
        <div className='w-72 z-10 bg-lyriks-dark-1 h-full overflow-y-auto scrollbar-w-1 scrollbar-thumb-phoenix-light-green scrollbar-thumb-rounded-xl scrollbar-track-transparent fixed flex-col justify-between items-center p-4 text-white'>
          <div className='flex flex-row'>
            <Image src={images.logo} objectFit='cover' width={52} height={52} />
            <span className='py-4'>PHOENIX LYRIKS</span>
          </div>
          <div className='pt-4'>
            <MenuItems />
            <div className='pt-24'>
              <Genres
                genres={genres}
                activeGenre={activeGenre}
                setActiveGenre={setActiveGenre}
              />
              <Countries />
            </div>
          </div>
        </div>
      )}

      <MusicPlayer />

      <div className='bg-lyriks-dark-2 w-full'>
        <div className={`text-white ease-linear  ${show ? 'pl-72' : ''} `}>
          <div className='py-14 bg-lyriks-dark-2 '>
            <Search />
          </div>
          {children}
        </div>
      </div>
      {/* maybe footer can go here??? would be a new component */}
    </div>
  );
};

export default Sidebar;
