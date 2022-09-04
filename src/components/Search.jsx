import { useState } from 'react';
import { useRouter } from 'next/router';

const Search = () => {
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();

    if (searchValue) {
      router.push(`/search/${searchValue}`);
      setSearchValue('');
    }
  };
  return (
    <div className='text-lyriks-dark-1'>
      <div className='relative w-full bg-lyriks-dark-2'>
        <form
          className='absolute -bottom-8 left-10 rounded-lg'
          onSubmit={handleSearch}>
          <input
            type='text'
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder='Search songs and artists...'
            className='p-3 font-overpass md:text-md font-medium border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-phoenix-light-green w-[300px] md:w-[350px] rounded-br-lg rounded-tl-lg '
          />
          <button
            onClick={handleSearch}
            className='absolute md:right-5 right-6 top-4 border-l-2 border-gray-300 pl-4 text-gray-400'>
            <i className='fa-solid fa-magnifying-glass' />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Search;
