import { useGetChartsQuery } from '@services/shazamApi';

export const getCountryName = (countryCode) => {
  const { data, isFetching } = useGetChartsQuery();

  if (isFetching) {
    return '';
  }

  return data?.countries?.find((country) => country.id === countryCode)?.name;
};
