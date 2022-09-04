import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { GEOLOCATION_API_URL } from '@utils/constants';

export const GeolocationContext = React.createContext();

const geolocationApi = axios.create({
  baseURL: GEOLOCATION_API_URL,
});

export const GeolocationProvider = ({ children }) => {
  const [geoLocation, setGeoLocation] = useState('');

  useEffect(() => {
    const findLocation = async () => {
      const {
        data: { location },
      } = await geolocationApi.get(
        `/country?apiKey=${process.env.NEXT_PUBLIC_GEOLOCATION_API_KEY}`
      );

      setGeoLocation(location);
    };

    findLocation();
  }, []);

  return (
    <GeolocationContext.Provider value={{ geoLocation }}>
      {children}
    </GeolocationContext.Provider>
  );
};
