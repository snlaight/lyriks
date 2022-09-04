import { useRouter } from 'next/router';

const Genres = ({ genres, activeGenre, setActiveGenre }) => {
  const router = useRouter();

  return (
    <div className='px-4 pb-6'>
      <p className='font-semibold m-3 mt-4 block uppercase text-phoenix-light-green'>
        Genres
      </p>
      <div className='flex items-center gap-3 flex-wrap'>
        {!genres ? (
          <div> Loading genres....</div>
        ) : (
          <>
            {genres?.map((genre) => (
              <div
                key={genre.name}
                onClick={() => {
                  setActiveGenre(genre.name);
                  router.push({
                    pathname: `/genres/${genre.listid}`,
                    query: { genre: genre.name },
                  });
                }}
                className={` hover:bg-phoenix-light-green  transition-colors ease-in-out duration-300 ${
                  activeGenre === genre.name
                    ? ' bg-phoenix-light-green text-white hover:bg-lyriks-dark-2 '
                    : 'text-white'
                } px-3 py-2 rounded flex justify-center gap-2 text-xs cursor-pointer `}>
                <span> {genre.name} </span>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Genres;
