import SongCard from './SongCard';

const SongList = ({ heading, songs }) => {
  return (
    <div>
      <h2 className='px-10 text-xl uppercase'>{heading}</h2>
      <div className='flex flex-wrap'>
        {songs?.map((song, i) => (
          <SongCard song={song} key={i} />
        ))}
      </div>
    </div>
  );
};

export default SongList;
