import { Provider } from 'react-redux';
import Head from 'next/head';
import Script from 'next/script';

import { GeolocationProvider } from '@context/GeolocationContext';
import { CurrentlyPlayingProvider } from '@context/CurrentyPlaying';

import { Layout } from '@components/';
import store from '@store/store';
import '../styles/global.css';

const Lyriks = ({ Component, PageProps }) => (
  <Provider store={store}>
    <CurrentlyPlayingProvider>
      <GeolocationProvider>
        <Head>
          <title>Lyriks</title>
          <meta
            name='description'
            content='Lyriks application for Project #1 from JSM Masterclass'
          />
        </Head>
        <Layout>
          <Component {...PageProps} />
        </Layout>
        <Script
          src='https://kit.fontawesome.com/c7f9254581.js'
          crossorigin='anonymous'
        />
      </GeolocationProvider>
    </CurrentlyPlayingProvider>
  </Provider>
);

export default Lyriks;
