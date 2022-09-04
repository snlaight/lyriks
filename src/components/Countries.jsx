import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useGetChartsQuery } from '@services/shazamApi';

const Countries = () => {
  const { data, isFetching, error } = useGetChartsQuery();
  const router = useRouter();

  const [selectedCountry, setSelectedCountry] = useState('');

  return (
    <div className='px-4 pb-6'>
      <p className='font-semibold m-3 mt-4 block uppercase text-phoenix-light-green'>
        Countries
      </p>
      {isFetching ? (
        <div className='flexCenter'> Loading countries...</div>
      ) : (
        <>
          <div className='flex gap-3 flex-wrap'>
            {data?.countries
              ?.map((country) => (
                <Link href={`/countries/${country.id}`} key={country.id}>
                  <div
                    key={country?.name}
                    onClick={() => setSelectedCountry(country?.name)}
                    className={` hover:bg-phoenix-light-green  transition-colors ease-in-out duration-300 ${
                      selectedCountry === country?.name
                        ? ' bg-phoenix-light-green text-white hover:bg-lyriks-dark-2 '
                        : 'text-white'
                    } px-3 py-2 rounded flex items-center gap-2 justify-center text-xs cursor-pointer `}>
                    <span> {country?.name} </span>
                  </div>
                </Link>
              ))
              .slice(0, 24)}
          </div>
        </>
      )}
    </div>
  );
};

export default Countries;
