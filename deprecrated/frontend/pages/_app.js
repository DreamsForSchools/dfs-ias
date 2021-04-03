import React, {useEffect}  from 'react';
import initFirebase from '../lib/initFirebase';
import PropTypes from 'prop-types';

import Head from 'next/head';
import CssBaseline from '@material-ui/core/CssBaseline';

import { ProvideAuth } from "../lib/useAuth.js";

import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../styles/theme';
// fixes a bug.
import '../styles/new.css'
import '../styles/globals.css'

export default function MyApp({ Component, pageProps }) {
  
  initFirebase();

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Instructor Assignment Sorter</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="preconnect" href="https://fonts.gstatic.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;350;400;450;500;550;600;650&display=swap" rel="stylesheet"/>
        <link rel="icon" href="/dfslogo.svg" />
      </Head>
      
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <ProvideAuth>
            <Component { ...pageProps} />
        </ProvideAuth>
      </ThemeProvider>
    </React.Fragment>
  );
}
MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};