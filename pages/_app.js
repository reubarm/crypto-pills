import React from 'react';
import { Web3ReactProvider } from '@web3-react/core';
import { CryptoPillsContractProvider } from '../contexts/contractProvider';
import { SnackbarProvider } from 'notistack';
import { ethers } from 'ethers';

import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../themes/theme';
import getLibrary from '../utils/getLibrary'

function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Crypto-Pills by Micha Klein</title>
        <meta property="og:title" content="Crypto-Pills by Micha Klein" />
        <meta property="twitter:title" content="Crypto-Pills by Micha Klein" />
        <meta property="og:url" content="https://crypto-pills.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:description" content="Micha Klein’s digital art has been around for over 30 years, and is not going away." />
        <meta property="twitter:description" content="Micha Klein’s digital art has been around for over 30 years, and is not going away." />
        <meta property="og:image" content="/images/pills-logo.jpg" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
        <link rel="icon" href="/favicon.png" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Work+Sans:200,300,400,500,600,700,800&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <SnackbarProvider maxSnack={3}>
          <Web3ReactProvider getLibrary={getLibrary}>
            <CryptoPillsContractProvider>
              <Component {...pageProps} />
            </CryptoPillsContractProvider>
          </Web3ReactProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </>
  )
}

export default MyApp
